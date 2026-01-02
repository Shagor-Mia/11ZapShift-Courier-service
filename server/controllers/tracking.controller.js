const TrackingModel = require("../models/tracking.model");

exports.getTrackingLogs = async (req, res) => {
  const tracking = await TrackingModel();

  const result = await tracking
    .find({ trackingId: req.params.trackingId })
    .toArray();

  res.send(result);
};
