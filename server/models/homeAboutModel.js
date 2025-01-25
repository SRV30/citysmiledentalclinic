const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  subheading: {
    type: String,
  },
  description1: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("homeAbout", aboutSchema);
