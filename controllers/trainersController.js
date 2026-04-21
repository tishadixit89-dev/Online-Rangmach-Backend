const Trainers = require("../models/Trainers");

/* ================= GET ALL ================= */
const getTrainers = async (req, res, next) => {
  try {
    const trainers = await Trainers.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trainers.length,
      data: trainers,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= GET BY ID ================= */
const getTrainersById = async (req, res, next) => {
  try {
    const trainer = await Trainers.findById(req.params.id); // ✅ FIXED

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: trainer,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= CREATE ================= */
const createTrainers = async (req, res, next) => {
  try {
    const { name, specialization, experience } = req.body;

    // 👇 get image from multer
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const existingTrainer = await Trainers.findOne({ name });

    if (existingTrainer) {
      return res.status(400).json({
        success: false,
        message: "Trainer already exists",
      });
    }

    const newTrainer = await Trainers.create({
      name,
      image,
      specialization,
      experience,
    });

    res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      data: newTrainer,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= UPDATE ================= */
const updateTrainers = async (req, res, next) => {
  try {
    const { name, specialization, experience } = req.body;

    let updateData = {
      name,
      specialization,
      experience,
    };

    // 👇 update image if new uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedTrainer = await Trainers.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTrainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trainer updated successfully",
      data: updatedTrainer,
    });
  } catch (error) {
    next(error);
  }
};

/* ================= DELETE ================= */
const deleteTrainers = async (req, res, next) => {
  try {
    const deletedTrainer = await Trainers.findByIdAndDelete(req.params.id);

    if (!deletedTrainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trainer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrainers,
  getTrainersById,
  createTrainers,
  updateTrainers,
  deleteTrainers,
};
