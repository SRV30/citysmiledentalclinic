const mongoose = require("mongoose");

const homeContactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  whatsappLink: {
    type: String,
    required: true,
  },
  hours1: {
    type: String,
    required: true,
  },
  hours2: {
    type: String,
    required: true,
  },
  hours3: {
    type: String,
    required: true,
  },
  hours4: {
    type: String,
    required: true,
  },
  hours5: {
    type: String,
    required: true,
  },
  hours6: {
    type: String,
    required: true,
  },
  hours7: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("HomeContact", homeContactSchema);
