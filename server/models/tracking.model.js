const connectDB = require("../config/db");

const trackingCollection = async () => {
  const db = await connectDB();
  return db.collection("tracking");
};

module.exports = trackingCollection;
