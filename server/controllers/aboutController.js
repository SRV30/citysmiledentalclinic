const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const About = require("../models/aboutModel");

exports.getAbout = catchAsyncErrors(async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

exports.updateAbout = catchAsyncErrors(async (req, res) => {
  const {
    profilePicture,
    name,
    qualifications,
    experience1,
    experience2,
    experience3,
    experience4,
    experience5,
    phone,
    whatsapp,
    registrationCertificate,
  } = req.body;
  try {
    const about = await About.findOneAndUpdate(
      {},
      {
        profilePicture,
        name,
        qualifications,
        experience1,
        experience2,
        experience3,
        experience4,
        experience5,
        phone,
        whatsapp,
        registrationCertificate,
      },
      { new: true, upsert: true }
    );
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
