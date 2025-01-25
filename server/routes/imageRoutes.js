const express = require("express");
const {
  uploadImage,
  getImages,
  deletePhoto,
} = require("../controllers/imageController");
const router = express.Router();

router.post("/upload/images", uploadImage);

router.get("/get/images", getImages);

router.delete("/delete/image", deletePhoto);

module.exports = router;
