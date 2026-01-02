const { ObjectId } = require("mongodb");
const ParcelModel = require("../models/parcel.model");
const RiderModel = require("../models/rider.model");
const TrackingModel = require("../models/tracking.model");
const generateTrackingId = require("../utils/generateTrackingId");

const logTracking = async (trackingId, status) => {
  const tracking = await TrackingModel();
  await tracking.insertOne({
    trackingId,
    status,
    details: status.split("_").join(" "),
    createdAt: new Date(),
  });
};

exports.getParcels = async (req, res) => {
  const parcels = await ParcelModel();
  const { email, deliverStatus } = req.query;

  const query = {};
  if (email) query.senderEmail = email;
  if (deliverStatus) query.deliverStatus = deliverStatus;

  const result = await parcels.find(query).sort({ createdAt: -1 }).toArray();
  res.send(result);
};

exports.getParcelById = async (req, res) => {
  const parcels = await ParcelModel();

  const result = await parcels.findOne({
    _id: new ObjectId(req.params.id),
  });

  res.send(result);
};

exports.createParcel = async (req, res) => {
  const parcels = await ParcelModel();

  const parcel = req.body;
  parcel.trackingId = generateTrackingId();
  parcel.createdAt = new Date();

  await logTracking(parcel.trackingId, "parcel_created");

  const result = await parcels.insertOne(parcel);
  res.send(result);
};

exports.assignRider = async (req, res) => {
  const parcels = await ParcelModel();
  const riders = await RiderModel();

  const { riderId, riderEmail, riderName, trackingId } = req.body;

  await parcels.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        deliverStatus: "driver_assigned",
        riderId,
        riderEmail,
        riderName,
      },
    }
  );

  await riders.updateOne(
    { _id: new ObjectId(riderId) },
    { $set: { workStatus: "in_delivery" } }
  );

  await logTracking(trackingId, "driver_assigned");
  res.send({ success: true });
};

exports.updateParcelStatus = async (req, res) => {
  const parcels = await ParcelModel();
  const riders = await RiderModel();

  const { deliverStatus, riderId, trackingId } = req.body;

  await parcels.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { deliverStatus } }
  );

  if (deliverStatus === "parcel_delivered") {
    await riders.updateOne(
      { _id: new ObjectId(riderId) },
      { $set: { workStatus: "available" } }
    );
  }

  await logTracking(trackingId, deliverStatus);
  res.send({ success: true });
};

exports.deleteParcel = async (req, res) => {
  const parcels = await ParcelModel();

  const result = await parcels.deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.send(result);
};
