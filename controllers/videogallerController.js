const Videogallery = require("../models/Videogallery");

// const validateRequiredFields = ({ name, email, course }) => {
//   if (!name || !email || !course) {
//     return "Name, email and course are required";
//   }

//   return null;
// };

const getVideogallery = async (req, res, next) => {
  try {
    const videogallery = await Videogallery.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: videogallery.length,
      data: videogallery,
    });
  } catch (error) {
    next(error);
  }
};

const getVideogalleryById = async (req, res, next) => {
  try {
    const videogallery = await Videogallery.findById(req.params.id);

    if (!videogallery) {
      return res
        .status(404)
        .json({ success: false, message: "Videogallery not found" });
    }

    res.status(200).json({
      success: true,
      data: videogallery,
    });
  } catch (error) {
    next(error);
  }
};

const createVideogallery = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // 👇 get video file
    const video = req.file ? req.file.filename : null;

    if (!video) {
      return res.status(400).json({
        success: false,
        message: "Video is required",
      });
    }

    const existingVideogallery = await Videogallery.findOne({ title });

    if (existingVideogallery) {
      return res.status(400).json({
        success: false,
        message: "Title already exists",
      });
    }

    const newVideogallery = await Videogallery.create({
      title,
      video, // 👈 store filename
      description,
    });

    res.status(201).json({
      success: true,
      message: "Videogallery created successfully",
      data: newVideogallery,
    });
  } catch (error) {
    next(error);
  }
};

const updateVideogallery = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    let updateData = {
      title,
      description,
    };

    // 👇 update video if uploaded
    if (req.file) {
      updateData.video = req.file.filename;
    }

    const updatedVideogallery = await Videogallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedVideogallery) {
      return res.status(404).json({
        success: false,
        message: "Videogallery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Videogallery updated successfully",
      data: updatedVideogallery,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVideogallery = async (req, res, next) => {
  try {
    const deletedVideogallery = await Videogallery.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedVideogallery) {
      return res.status(404).json({
        success: false,
        message: "Videogallery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Videogallery deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVideogallery,
  getVideogalleryById,
  createVideogallery,
  updateVideogallery,
  deleteVideogallery,
};
