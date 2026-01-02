const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.URL;
if (!uri) throw new Error(" MongoDB URL is missing");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db("zapShiftDB");
    console.log("MongoDB connected");
  }
  return db;
};

module.exports = connectDB;
