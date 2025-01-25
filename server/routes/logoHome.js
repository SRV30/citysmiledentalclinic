const express = require("express");
const router = express.Router();
const {
  getHomePageContent,
  updateHomePageContent,
} = require("../controllers/logoHome");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.get("/get/logo", getHomePageContent);

router.post("/update/logo", isAuthenticatedUser,
  authorizeRoles("admin"), updateHomePageContent);

module.exports = router;
