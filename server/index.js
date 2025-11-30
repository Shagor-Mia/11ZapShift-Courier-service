const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
const port = process.env.PORT || 3000;

const admin = require("firebase-admin");

// firebase adminSDK
const fs = require("fs");

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMIN, "base64").toString("utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// trackingId
const generateTrackingId = () => {
  const prefix = "PRCL";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const random = Math.random().toString(36).substring(2, 10).toUpperCase(); // 8-char random

  return `${prefix}-${date}-${random}`;
};

// middlewares
app.use(express.json());
app.use(cors());

const verifyFirebaseToken = async (req, res, next) => {
  // console.log("authorizeToken,", req.headers.authorization);
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: `unauthorized access` });
  }
  try {
    const idToken = token.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    // console.log(`decoded in the token`, decoded);
    req.decoded_email = decoded.email;
  } catch (error) {
    return res.status(401).send({ message: "Invalid or expired token", error });
  }
  next();
};

const uri = process.env.URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("zapShiftDB");
    const userCollection = db.collection("users");
    const parcelCollection = db.collection("parcels");
    const paymentCollection = db.collection("payments");
    const riderCollection = db.collection("riders");

    // user apis
    app.get("/users", verifyFirebaseToken, async (req, res) => {
      // console.log(verifyFirebaseToken);
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      user.role = "user";
      user.createdAt = new Date();

      const email = user.email;
      const userExist = await userCollection.findOne({ email });
      if (userExist) {
        return res.send({ message: "user already exist!" });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {});

    app.get("/users/:email/role", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne(email);
      if (!user) {
        res.status(401).send({ message: "user not found" });
      } else {
        res.send({ role: user?.role || "user" });
      }
    });

    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;
      const roleInfo = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: roleInfo.role,
        },
      };
      const result = await userCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    //
    app.get("/parcels", async (req, res) => {
      const parcels = await parcelCollection.find().toArray();
      res.send(parcels);
    });

    // single data query email
    app.get("/parcel", async (req, res) => {
      const query = {};
      const { email } = req.query;
      if (email) {
        query.senderEmail = email;
      }
      const options = { sort: { createdAt: -1 } };
      const parcels = await parcelCollection.find(query, options).toArray();
      res.send(parcels);
    });

    // single data id
    app.get("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelCollection.findOne(query);
      res.send(result);
    });

    app.delete("/parcels/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/parcels", async (req, res) => {
      const parcel = req.body;
      parcel.createdAt = new Date();
      const result = await parcelCollection.insertOne(parcel);
      res.send(result);
    });

    // payment related apis
    app.get("/payments", verifyFirebaseToken, async (req, res) => {
      const email = req.query.email;
      const query = {};
      // console.log("headers", req.headers);
      if (email) {
        query.customerEmail = email;
        // check user email
        if (email !== req.decoded_email) {
          return res.status(403).send({ message: "forbidden access" });
        }
      }
      const result = await paymentCollection
        .find(query)
        .sort({
          paidAt: -1,
        })
        .toArray();
      res.send(result);
    });

    // stripe integration
    app.post("/payment-checkout-session", async (req, res) => {
      const paymentInfo = req.body;
      const amount = parseInt(paymentInfo.cost) * 100;

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, price_1234) of the product you want to sell
            price_data: {
              currency: "usd",
              unit_amount: amount,
              product_data: {
                name: `Please pay for ${paymentInfo.parcelName}`,
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          parcelId: paymentInfo.parcelId,
          parcelName: paymentInfo.parcelName,
        },
        customer_email: paymentInfo.senderEmail,
        success_url: `${process.env.DOMAIN_URL}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment-cancelled?success=true`,
      });
      res.send({ url: session.url });
    });

    // old
    app.post("/create-checkout-session", async (req, res) => {
      const paymentInfo = req.body;
      const amount = parseInt(paymentInfo.cost * 100);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, price_1234) of the product you want to sell
            price_data: {
              currency: "USD",
              unit_amount: amount,
              product_data: {
                name: paymentInfo.parcelName,
              },
            },
            quantity: 1,
          },
        ],
        customer_email: paymentInfo.senderEmail,
        metadata: {
          parcelId: paymentInfo.parcelId,
        },
        mode: "payment",
        success_url: `${process.env.DOMAIN_URL}/dashboard/payment-success`,
        cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment-cancelled`,
      });

      console.log(session);
      res.send({ url: session.url });
    });

    // verify payment
    app.patch("/verify-success-payment", async (req, res) => {
      const sessionId = req.query.session_id;
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      // console.log(session);

      // stop duplication input
      const transactionId = session.payment_intent;
      const query = { transactionId: transactionId };
      const paymentExist = await paymentCollection.findOne(query);
      if (paymentExist) {
        return res.send({
          message: "transaction exist",
          transactionId,
          trackingId: paymentExist.trackingId,
        });
      }

      const trackingId = generateTrackingId();

      if (session.payment_status === "paid") {
        const id = session.metadata.parcelId;
        const query = { _id: new ObjectId(id) };
        const update = {
          $set: {
            paymentStatus: "paid",
            trackingId: trackingId,
          },
        };
        const result = await parcelCollection.updateOne(query, update);

        const payment = {
          amount: session.amount_total / 100,
          currency: session.currency,
          customerEmail: session.customer_email,
          parcelId: session.metadata.parcelId,
          parcelName: session.metadata.parcelName,
          transactionId: session.payment_intent,
          paymentStatus: session.payment_status,
          trackingId: trackingId,
          paidAt: new Date(),
        };

        if (session.payment_status === "paid") {
          const paymentResult = await paymentCollection.insertOne(payment);
          res.send({
            success: true,
            modifyParcel: result,
            trackingId: trackingId,
            transactionId: session.payment_intent,
            paymentInfo: paymentResult,
          });
        }
      } else {
        res.send({ success: false });
      }
    });

    // riders api
    app.post("/riders", async (req, res) => {
      const rider = req.body;
      rider.status = "pending";
      rider.createdAt = new Date();

      const result = await riderCollection.insertOne(rider);
      res.send(result);
    });
    // query with status
    app.get("/riders", async (req, res) => {
      const query = {};
      if (req.query.status) {
        query.status = req.query.status;
      }
      const rider = await riderCollection.find(query).toArray();
      res.send(rider);
    });

    // update rider status,role
    app.patch("/riders/:id", verifyFirebaseToken, async (req, res) => {
      const { status } = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status,
        },
      };
      const result = await riderCollection.updateOne(query, updateDoc);
      if (status === "approved") {
        const email = req.body.email;
        const userQuery = { email };
        const updateUser = {
          $set: {
            role: "rider",
          },
        };
        const userResult = await userCollection.updateOne(
          userQuery,
          updateUser
        );
      }
      res.send(result);
    });

    // delete a rider
    app.delete("/riders/:id", verifyFirebaseToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await riderCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("zap shifting!");
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
