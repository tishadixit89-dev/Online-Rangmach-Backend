const mongoose = require("mongoose");

const videogallerySchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  video: {
    type: String,
    // required: true,
  },
  discription: {
    type: String,
    // required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Videogallery", videogallerySchema);
