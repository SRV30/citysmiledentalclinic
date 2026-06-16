const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Please share your experience"],
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
