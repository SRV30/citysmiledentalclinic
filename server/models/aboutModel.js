const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  profilePicture: { type: String, required: true },
  name: { type: String, required: true },
  qualifications: { type: String, required: true },
  experience1: { type: String, required: true },
  experience2: { type: String, required: true },
  experience3: { type: String },
  experience4: { type: String },
  experience5: { type: String },
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  registrationCertificate: { type: String, required: true },
});

const About = mongoose.model("About", aboutSchema);

module.exports = About;
