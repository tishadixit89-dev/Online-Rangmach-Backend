const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getPhotogallery,
  getPhotogalleryById,
  createPhotogallery,
  updatePhotogallery,
  deletePhotogallery,
} = require("../controllers/photogalleryController");

router.get("/", getPhotogallery);
router.get("/:id", getPhotogalleryById);
router.post("/", upload.single("image"), createPhotogallery);
// router.post("/", createPhotogallery);
router.put("/:id", upload.single("image"), updatePhotogallery);
router.delete("/:id", deletePhotogallery);

module.exports = router;
