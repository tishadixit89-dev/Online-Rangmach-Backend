const mongoose = require("mongoose");

const addmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    unique: true,
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

module.exports = mongoose.model("Addmission", addmissionSchema);
