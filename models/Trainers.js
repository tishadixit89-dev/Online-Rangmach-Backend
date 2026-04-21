const mongoose = require("mongoose");

const trainersSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  specialization: {
    type: String,
    // required: true,
  },
  experience: {
    type: String,
    // required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trainers", trainersSchema);
