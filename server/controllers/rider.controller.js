const { ObjectId } = require("mongodb");
const RiderModel = require("../models/rider.model");
const UserModel = require("../models/user.model");

exports.getRiders = async (req, res) => {
  const riders = await RiderModel();
  const result = await riders.find(req.query).toArray();
  res.send(result);
};

exports.createRider = async (req, res) => {
  const riders = await RiderModel();

  const rider = {
    ...req.body,
    status: "pending",
    createdAt: new Date(),
  };

  const result = await riders.insertOne(rider);
  res.send(result);
};

exports.updateRider = async (req, res) => {
  const riders = await RiderModel();
  const users = await UserModel();

  const { status, email } = req.body;

  await riders.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { status, workStatus: "available" } }
  );

  if (status === "approved") {
    await users.updateOne({ email }, { $set: { role: "rider" } });
  }

  res.send({ success: true });
};

exports.deleteRider = async (req, res) => {
  const riders = await RiderModel();

  const result = await riders.deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.send(result);
};
