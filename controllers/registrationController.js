const Registration = require("../models/Registration");

// const validateRequiredFields = ({ name, email, course }) => {
//   if (!name || !email || !course) {
//     return "Name, email and course are required";
//   }

//   return null;
// };

const getRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: registration.length,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

const getRegistrationById = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

const createRegistration = async (req, res, next) => {
  try {
    const { studentname, address, city, phonenumber, email, gender, courses } =
      req.body;
    console.log(req.body);
    const existingRegistration = await Registration.findOne({ studentname });
    if (existingRegistration) {
      return res
        .status(400)
        .json({ success: false, message: "Registration already exists" });
    }

    const newRegistration = await Registration.create({
      studentname,
      email,
      phonenumber,
      address,
      city,
      gender,
      courses,
    });
    res.status(201).json({
      success: true,
      message: "Registration created successfully",
      data: newRegistration,
    });
  } catch (error) {
    next(error);
  }
};

const updateRegistration = async (req, res, next) => {
  try {
    const { studentname, address, city, phonenumber, email, gender, courses } =
      req.body;

    if (
      studentname === "" ||
      email === "" ||
      phonenumber === "" ||
      address === "" ||
      city === "" ||
      gender === "" ||
      courses === ""
    ) {
      return res.status(400).json({
        success: false,
        message:
          "studentname,phonenumber,email,address, city,gender, and courses cannot be empty",
      });
    }

    const updateData = {
      studentname,
      address,
      city,
      phonenumber,
      email,
      gender,
      courses,
    };
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedRegistration) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    }

    res.status(200).json({
      success: true,
      message: "Registration updated successfully",
      data: updatedRegistration,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRegistration = async (req, res, next) => {
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedRegistration) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    }

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRegistration,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration,
};
