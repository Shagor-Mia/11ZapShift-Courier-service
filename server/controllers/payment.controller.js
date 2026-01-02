const stripe = require("../config/stripe");
const { ObjectId } = require("mongodb");
const PaymentModel = require("../models/payment.model");
const ParcelModel = require("../models/parcel.model");
const TrackingModel = require("../models/tracking.model");

exports.getPayments = async (req, res) => {
  const payments = await PaymentModel();

  if (req.query.email !== req.decoded_email) {
    return res.status(403).send({ message: "forbidden access" });
  }

  const result = await payments
    .find({ customerEmail: req.query.email })
    .sort({ paidAt: -1 })
    .toArray();

  res.send(result);
};

exports.createCheckoutSession = async (req, res) => {
  const info = req.body;
  const amount = parseInt(info.cost) * 100;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: `Please pay for ${info.parcelName}`,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: info,
    customer_email: info.senderEmail,
    success_url: `${process.env.DOMAIN_URL}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.DOMAIN_URL}/dashboard/payment-cancelled`,
  });

  res.send({ url: session.url });
};

exports.verifyPayment = async (req, res) => {
  const payments = await PaymentModel();
  const parcels = await ParcelModel();
  const tracking = await TrackingModel();

  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  const exists = await payments.findOne({
    transactionId: session.payment_intent,
  });

  if (exists) return res.send({ message: "transaction exist" });

  if (session.payment_status === "paid") {
    await parcels.updateOne(
      { _id: new ObjectId(session.metadata.parcelId) },
      {
        $set: {
          paymentStatus: "paid",
          deliverStatus: "pending-pickup",
        },
      }
    );

    await payments.insertOne({
      amount: session.amount_total / 100,
      currency: session.currency,
      customerEmail: session.customer_email,
      parcelId: session.metadata.parcelId,
      transactionId: session.payment_intent,
      paymentStatus: session.payment_status,
      trackingId: session.metadata.trackingId,
      paidAt: new Date(),
    });

    await tracking.insertOne({
      trackingId: session.metadata.trackingId,
      status: "parcel_paid",
      createdAt: new Date(),
    });

    return res.send({ success: true });
  }

  res.send({ success: false });
};
