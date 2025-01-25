const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/homeAboutController");

router.get("/get/home/about", aboutController.getAboutContent);

router.put("/update/home/about", aboutController.updateAboutContent);

module.exports = router;
