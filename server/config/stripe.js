if (!process.env.STRIPE_KEY) {
  throw new Error("STRIPE_KEY env variable missing");
}

const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = stripe;
