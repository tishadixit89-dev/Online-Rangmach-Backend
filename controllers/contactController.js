const Admincontact = require("../models/Contact");

// const validateRequiredFields = ({ name, email, course }) => {
//   if (!name || !email || !course) {
//     return "Name, email and course are required";
//   }

//   return null;
// };

const getAdmincontact = async (req, res, next) => {
  try {
    const admincontact = await Admincontact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: admincontact.length,
      data: admincontact,
    });
  } catch (error) {
    next(error);
  }
};

const getAdmincontactById = async (req, res, next) => {
  try {
    const admincontact = await Admincontact.findById(req.params.id);

    if (!admincontact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      data: admincontact,
    });
  } catch (error) {
    next(error);
  }
};

const createAdmincontact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    console.log(req.body);
    // const existingAdmincontact = await Admincontact.findOne({ name });
    // if (existingAdmincontact) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Contact already exists" });
    // }

    const newContact = await Admincontact.create({
      name,
      email,
      message,
    });
    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateAdmincontact = async (req, res, next) => {
  try {
    const { Name, Email, Message } = req.body;

    if (Name === "" || Email === "" || Message === "") {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Message cannot be empty",
      });
    }

    const updateData = { Name, Email, Message };
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedAdmincontact = await Admincontact.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedAdmincontact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedAdmincontact,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmincontact = async (req, res, next) => {
  try {
    const deletedAdmincontact = await Admincontact.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedAdmincontact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdmincontact,
  getAdmincontactById,
  createAdmincontact,
  updateAdmincontact,
  deleteAdmincontact,
};
