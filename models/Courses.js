const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  duration: {
    type: String,
    // required: true,
  },
  fees: {
    type: Number,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  courseImg: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
