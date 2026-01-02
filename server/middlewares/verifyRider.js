const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    const email = req.decoded_email;

    const user = await User.findOne({ email });

    if (!user || user.role !== "rider") {
      return res.status(403).send({ message: "forbidden access" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Rider verification failed" });
  }
};
