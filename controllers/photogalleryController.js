const Photogallery = require("../models/Photogallery");

// const validateRequiredFields = ({ name, email, course }) => {
//   if (!name || !email || !course) {
//     return "Name, email and course are required";
//   }

//   return null;
// };

const getPhotogallery = async (req, res, next) => {
  try {
    const photogallery = await Photogallery.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: photogallery.length,
      data: photogallery,
    });
  } catch (error) {
    next(error);
  }
};

const getPhotogalleryById = async (req, res, next) => {
  try {
    const photogallery = await Photogallery.findById(req.params.id);

    if (!photogallery) {
      return res
        .status(404)
        .json({ success: false, message: "Photogallery not found" });
    }

    res.status(200).json({
      success: true,
      data: photogallery,
    });
  } catch (error) {
    next(error);
  }
};

const createPhotogallery = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // 👇 Multer gives file here
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const existingphotogallery = await Photogallery.findOne({ title });
    if (existingphotogallery) {
      return res.status(400).json({
        success: false,
        message: "Title already exists",
      });
    }

    const newPhotogallery = await Photogallery.create({
      title,
      image,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Photogallery created successfully",
      data: newPhotogallery,
    });
  } catch (error) {
    next(error);
  }
};

const updatePhotogallery = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    let updateData = {
      title,
      description,
    };

    // 👇 If new image uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedPhotogallery = await Photogallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedPhotogallery) {
      return res.status(404).json({
        success: false,
        message: "Photogallery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Photogallery updated successfully",
      data: updatedPhotogallery,
    });
  } catch (error) {
    next(error);
  }
};

const deletePhotogallery = async (req, res, next) => {
  try {
    const deletedPhotogallery = await Photogallery.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedPhotogallery) {
      return res
        .status(404)
        .json({ success: false, message: "Photogallery not found" });
    }

    res.status(200).json({
      success: true,
      message: "Photogallery deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPhotogallery,
  getPhotogalleryById,
  createPhotogallery,
  updatePhotogallery,
  deletePhotogallery,
};
