const Addmission = require("../models/Addmission");

// const validateRequiredFields = ({ name, email, course }) => {
//   if (!name || !email || !course) {
//     return "Name, email and course are required";
//   }

//   return null;
// };

const getAddmission = async (req, res, next) => {
  try {
    const addmission = await Addmission.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: addmission.length,
      data: addmission,
    });
  } catch (error) {
    next(error);
  }
};

const getAddmissionById = async (req, res, next) => {
  try {
    const Addmission = await Addmission.findById(req.params.id);

    if (!addmission) {
      return res
        .status(404)
        .json({ success: false, message: "Addmission not found" });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

const createAddmission = async (req, res, next) => {
  try {
    const { coursename, duration, fees, description, courseImg } = req.body;
    console.log(req.body);
    const existingAddmission = await Addmission.findOne({ addmissionname });
    if (existingAddmission) {
      return res
        .status(400)
        .json({ success: false, message: "Addmission already exists" });
    }

    const newAddmission = await Addmission.create({
      coursename,
      duration,
      fees,
      description,
      courseImg,
    });
    res.status(201).json({
      success: true,
      message: "Addmission created successfully",
      data: newAddmission,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddmission = async (req, res, next) => {
  try {
    const { name, email, course, age } = req.body;

    if (name === "" || email === "" || course === "") {
      return res.status(400).json({
        success: false,
        message: "Name, email and course cannot be empty",
      });
    }

    const updateData = { name, email, course, age };
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedAddmission = await Addmission.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedAddmission) {
      return res
        .status(404)
        .json({ success: false, message: "Addmission not found" });
    }

    res.status(200).json({
      success: true,
      message: "Addmission updated successfully",
      data: updatedAddmission,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAddmission = async (req, res, next) => {
  try {
    const deletedAddmission = await Student.findByIdAndDelete(req.params.id);

    if (!deletedAddmission) {
      return res
        .status(404)
        .json({ success: false, message: "Addmission not found" });
    }

    res.status(200).json({
      success: true,
      message: "Addmission deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAddmission,
  getAddmissionById,
  createAddmission,
  updateAddmission,
  deleteAddmission,
};
