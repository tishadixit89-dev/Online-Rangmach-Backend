const express = require("express");
const {
  getAdmincontact,
  getAdmincontactById,
  createAdmincontact,
  updateAdmincontact,
  deleteAdmincontact,
} = require("../controllers/contactController");

const router = express.Router();

router.get("/", getAdmincontact);
router.get("/:id", getAdmincontactById);
router.post("/", createAdmincontact);
router.put("/:id", updateAdmincontact);
router.delete("/:id", deleteAdmincontact);

module.exports = router;
