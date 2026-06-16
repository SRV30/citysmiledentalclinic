const Testimonial = require("../models/testimonialModel");

// Public: Create a new testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const { patientName, rating, comment } = req.body;

    if (!patientName || !rating || !comment) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const testimonial = await Testimonial.create({
      patientName,
      rating,
      comment,
      isApproved: false, // Force moderation
    });

    res.status(201).json({
      success: true,
      message: "Thank you for your feedback! It will be visible after review.",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public: Get all approved testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort("-createdAt");
    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all testimonials (moderation queue)
exports.adminGetAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort("-createdAt");
    res.status(200).json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Approve/Reject testimonial
exports.updateTestimonialStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      success: true,
      message: `Testimonial ${isApproved ? 'approved' : 'hidden'} successfully`,
      testimonial,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
