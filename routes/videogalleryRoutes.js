const express = require("express");
const router = express.Router();
const uploadVideo = require("../middleware/uploadVideo");
const {
  getVideogallery,
  getVideogalleryById,
  createVideogallery,
  updateVideogallery,
  deleteVideogallery,
} = require("../controllers/videogallerController");

router.get("/", getVideogallery);
router.get("/:id", getVideogalleryById);
router.post("/", uploadVideo.single("video"), createVideogallery);
router.put("/:id", uploadVideo.single("video"), updateVideogallery);
router.delete("/:id", deleteVideogallery);

module.exports = router;
