const router = require("express").Router();

const {
  getUsers,
  createUser,
  getUserRole,
  updateUserRole,
} = require("../controllers/user.controller");

const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.get("/", verifyFirebaseToken, getUsers);
router.post("/", createUser);
router.get("/:email/role", getUserRole);

router.patch("/:id/role", verifyFirebaseToken, verifyAdmin, updateUserRole);

module.exports = router;
