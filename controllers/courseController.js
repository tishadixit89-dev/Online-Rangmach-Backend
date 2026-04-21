const Courses = require("../models/Courses");

/* ================= GET ALL ================= */
const getCourses = async (req, res, next) => {
  try {
    const courses = await Courses.find().sort({ created_at: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET BY ID ================= */
const getCoursesById = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= CREATE ================= */
const createCourses = async (req, res, next) => {
  try {
    const { coursename, duration, fees, description } = req.body;

    // 👇 multer file
    const image = req.file ? req.file.filename : null;

    if (!coursename || !duration || !fees || !image) {
      return res.status(400).json({
        success: false,
        message: "coursename, image, duration and fees are required",
      });
    }

    const existingCourse = await Courses.findOne({ coursename });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course already exists",
      });
    }

    const newCourse = await Courses.create({
      coursename,
      image,
      duration,
      fees,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= UPDATE ================= */
const updateCourses = async (req, res, next) => {
  try {
    const { coursename, duration, fees, description } = req.body;

    let updateData = {
      coursename,
      duration,
      fees,
      description,
    };

    // 👇 update image only if new uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedCourse = await Courses.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= DELETE ================= */
const deleteCourses = async (req, res, next) => {
  try {
    const deletedCourse = await Courses.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getCoursesById,
  createCourses,
  updateCourses,
  deleteCourses,
};
