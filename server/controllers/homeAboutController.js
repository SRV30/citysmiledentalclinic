const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const About = require("../models/homeAboutModel");

exports.getAboutContent = catchAsyncErrors(async (req, res) => {
  try {
    const aboutContent = await About.findOne();
    res.json(aboutContent);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

exports.updateAboutContent = catchAsyncErrors(async (req, res) => {
  const { heading, subheading, description1, description2, imageUrl } =
    req.body;

  try {
    let aboutContent = await About.findOne();

    if (!aboutContent) {
      aboutContent = new About({
        heading,
        subheading,
        description1,
        description2,
        imageUrl,
      });
    } else {
      aboutContent.heading = heading;
      aboutContent.subheading = subheading;
      aboutContent.description1 = description1;
      aboutContent.description2 = description2;
      aboutContent.imageUrl = imageUrl;
    }

    await aboutContent.save();
    res.json({ message: "About content updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
