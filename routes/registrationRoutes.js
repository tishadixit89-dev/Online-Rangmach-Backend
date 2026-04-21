const express = require("express");
const {
  getRegistration,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration,
} = require("../controllers/registrationController");

const router = express.Router();

router.get("/", getRegistration);
router.get("/:id", getRegistrationById);
router.post("/", createRegistration);
router.put("/:id", updateRegistration);
router.delete("/:id", deleteRegistration);

module.exports = router;
