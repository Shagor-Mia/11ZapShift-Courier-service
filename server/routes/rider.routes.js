const router = require("express").Router();

const {
  getRiders,
  createRider,
  updateRider,
  deleteRider,
} = require("../controllers/rider.controller");

const verifyFirebaseToken = require("../middlewares/verifyFirebaseToken");

router.get("/", getRiders);
router.post("/", createRider);

router.patch("/:id", verifyFirebaseToken, updateRider);
router.delete("/:id", verifyFirebaseToken, deleteRider);

module.exports = router;
