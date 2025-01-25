const express = require("express");
const router = express.Router();
const homeContactController = require("../controllers/homeContactController");

router.get("/get/home/contact", homeContactController.getHomeContact);
router.post("/update/home/contact", homeContactController.updateHomeContact);

module.exports = router;
