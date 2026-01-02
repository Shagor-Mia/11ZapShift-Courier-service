const express = require("express");
const cors = require("cors");
require("dotenv").config();

// create app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/users", require("./routes/user.routes"));
app.use("/parcels", require("./routes/parcel.routes"));
app.use("/", require("./routes/payment.routes"));
app.use("/riders", require("./routes/rider.routes"));
app.use("/trackings", require("./routes/tracking.routes"));

// root
app.get("/", (req, res) => {
  res.send("zap shifting!");
});

module.exports = app;
