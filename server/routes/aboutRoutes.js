const express = require("express");
const { getAbout, updateAbout } = require("../controllers/aboutController");
const router = express.Router();

router.get("/get/aboutMe", getAbout);
router.put("/update/aboutMe", updateAbout);

module.exports = router;
