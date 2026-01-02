const connectDB = require("../config/db");

const riderCollection = async () => {
  const db = await connectDB();
  return db.collection("riders");
};

module.exports = riderCollection;
