const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.get("/get/service", serviceController.getServices);

router.post(
  "/create/service",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  serviceController.createService
);

router.delete(
  "/delete/service/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  serviceController.deleteService
);

module.exports = router;
