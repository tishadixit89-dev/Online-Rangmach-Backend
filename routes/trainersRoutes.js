const express = require("express");
const {
  getTrainers,
  getTrainersById,
  createTrainers,
  updateTrainers,
  deleteTrainers,
} = require("../controllers/trainersController");

const router = express.Router();
const upload = require("../middleware/upload");

router.get("/", getTrainers);
router.get("/:id", getTrainersById);
router.post("/", upload.single("image"), createTrainers);
router.put("/:id", upload.single("image"), updateTrainers);
router.delete("/:id", deleteTrainers);

module.exports = router;
