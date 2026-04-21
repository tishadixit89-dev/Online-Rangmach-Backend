const express = require("express");
const {
  getCourses,
  getCoursesById,
  createCourses,
  updateCourses,
  deleteCourses,
} = require("../controllers/courseController");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCoursesById);
router.post("/", upload.single("image"), createCourses);
router.put("/:id", upload.single("image"), updateCourses);
router.delete("/:id", deleteCourses);

module.exports = router;
