const Student = require("../models/Student");

// const validateRequiredFields = ({ name, email, course }) => {
//   if (!name || !email || !course) {
//     return "Name, email and course are required";
//   }

//   return null;
// };

const getStudents = async (req, res, next) => {
  try {
    const student = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: student.length,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const Student = await Student.findById(req.params.id);

    if (!student) {
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

const createStudent = async (req, res, next) => {
  try {
    const {
      FirstName,
      LastName,
      DOB,
      Gender,
      Email,
      MobileNumber,
      Address,
      City,
      Course,
    } = req.body;
    console.log(req.body);
    const existingStudent = await Student.findOne({ Email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Addmission already exists" });
    }

    const newStudent = await Student.create({
      FirstName,
      LastName,
      DOB,
      Gender,
      Email,
      MobileNumber,
      Address,
      City,
      Course,
    });
    res.status(201).json({
      success: true,
      message: "Addmission created successfully",
      data: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const {
      FirstName,
      LastName,
      DOB,
      Gender,
      Email,
      MobileNumber,
      Address,
      City,
      Course,
    } = req.body;

    if (
      FirstName === "" ||
      LastName === "" ||
      DOB === "" ||
      Gender === "" ||
      Email === "" ||
      MobileNumber === "" ||
      Address === "" ||
      City === "" ||
      Course === ""
    ) {
      return res.status(400).json({
        success: false,
        message:
          "FirstName, LastName,DOB,Gender,Email,MobileNumber,Address,City and Course, cannot be empty",
      });
    }

    const updateData = {
      FirstName,
      LastName,
      DOB,
      Gender,
      Email,
      MobileNumber,
      Address,
      City,
      Course,
    };
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Addmission not found" });
    }

    res.status(200).json({
      success: true,
      message: "Addmission updated successfully",
      data: updateStudent,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deleteStudent) {
      return res
        .status(404)
        .json({ success: false, message: "SdeleteStudent not found" });
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
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
