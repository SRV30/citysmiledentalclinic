const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const HomePageContent = require("../models/homeContent");

exports.getHomePageContent = catchAsyncErrors(async (req, res) => {
  try {
    const content = await HomePageContent.findOne();
    if (!content) {
      return res.status(404).json({ message: "Homepage content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

exports.updateHomePageContent = catchAsyncErrors(async (req, res) => {
  const { logoUrl, heading, subheading } = req.body;
  try {
    let content = await HomePageContent.findOne();
    if (!content) {
      content = new HomePageContent({ logoUrl, heading, subheading });
    } else {
      content.logoUrl = logoUrl;
      content.heading = heading;
      content.subheading = subheading;
    }
    await content.save();
    res.json({ message: "Homepage content updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
