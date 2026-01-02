const router = require("express").Router();
const { getTrackingLogs } = require("../controllers/tracking.controller");

router.get("/:trackingId/logs", getTrackingLogs);

module.exports = router;
