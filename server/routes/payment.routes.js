const router = require("express").Router();

const {
  getPayments,
  createCheckoutSession,
  verifyPayment,
} = require("../controllers/payment.controller");

const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

// get payment history
router.get("/payments", verifyFirebaseToken, getPayments);

// stripe checkout
router.post("/payment-checkout-session", createCheckoutSession);

// stripe success webhook (redirect-based)
router.patch("/payment-success", verifyPayment);

module.exports = router;
