const { ObjectId } = require("mongodb");
const UserModel = require("../models/user.model");

exports.getUsers = async (req, res) => {
  const users = await UserModel();

  const searchText = req.query.searchText;
  const query = {};

  if (searchText) {
    query.$or = [
      { displayName: { $regex: searchText, $options: "i" } },
      { email: { $regex: searchText, $options: "i" } },
    ];
  }

  const result = await users
    .find(query)
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray();

  res.send(result);
};

exports.createUser = async (req, res) => {
  const users = await UserModel();

  const user = {
    ...req.body,
    role: "user",
    createdAt: new Date(),
  };

  const exists = await users.findOne({ email: user.email });
  if (exists) return res.send({ message: "user already exist!" });

  const result = await users.insertOne(user);
  res.send(result);
};

exports.getUserRole = async (req, res) => {
  const users = await UserModel();
  const user = await users.findOne({ email: req.params.email });

  if (!user) {
    return res.status(401).send({ message: "user not found" });
  }

  res.send({ role: user.role || "user" });
};

exports.updateUserRole = async (req, res) => {
  const users = await UserModel();

  const result = await users.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { role: req.body.role } }
  );

  res.send(result);
};
