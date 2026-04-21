const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  studentname: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phonenumber: {
    type: Number,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
  },
  courses: {
    type: String,
    // required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);
