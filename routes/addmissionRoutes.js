const express = require("express");
const {
  getAddmission,
  getAddmissionById,
  createAddmission,
  updateAddmission,
  deleteAddmission,
} = require("../controllers/addmissionController");

const router = express.Router();

router.get("/", getAddmission);
router.get("/:id", getAddmissionById);
router.post("/", createAddmission);
router.put("/:id", updateAddmission);
router.delete("/:id", deleteAddmission);

module.exports = router;
