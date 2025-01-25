const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Image = require("../models/imageModel");

exports.uploadImage = catchAsyncErrors(async (req, res) => {
  try {
    const { url } = req.body;
    const newImage = new Image({ url });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: "Error uploading image" });
  }
});

exports.getImages = catchAsyncErrors(async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving images" });
  }
});

exports.deletePhoto = catchAsyncErrors(async (req, res) => {
  const { url } = req.body;

  try {
    const photo = await Image.findOneAndDelete({ url });

    if (!photo) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


