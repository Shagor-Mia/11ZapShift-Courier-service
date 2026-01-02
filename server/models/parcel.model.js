const connectDB = require("../config/db");

const parcelCollection = async () => {
  const db = await connectDB();
  return db.collection("parcels");
};

module.exports = parcelCollection;
