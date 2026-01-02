const router = require("express").Router();

const {
  getParcels,
  getParcelById,
  createParcel,
  assignRider,
  updateParcelStatus,
  deleteParcel,
} = require("../controllers/parcel.controller");

router.get("/", getParcels);
router.get("/:id", getParcelById);
router.post("/", createParcel);

// assign rider to parcel
router.patch("/:id", assignRider);

// update delivery status
router.patch("/:id/status", updateParcelStatus);

router.delete("/:id", deleteParcel);

module.exports = router;
