const express = require("express");
const {
  createTestimonial,
  getAllTestimonials,
  adminGetAllTestimonials,
  updateTestimonial,
  updateTestimonialStatus,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// Public routes
router.route("/testimonial/new").post(createTestimonial);
router.route("/testimonials").get(getAllTestimonials);

// Admin routes
router
  .route("/admin/testimonials")
  .get(isAuthenticatedUser, authorizeRoles("admin"), adminGetAllTestimonials);

router
  .route("/admin/testimonial/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateTestimonial)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTestimonial);

// Status only update fallback
router
  .route("/admin/testimonial/status/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateTestimonialStatus);

module.exports = router;
