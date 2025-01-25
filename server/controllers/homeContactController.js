const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const HomeContact = require("../models/homeContactModel");

exports.getHomeContact = catchAsyncErrors(async (req, res) => {
  try {
    const contactInfo = await HomeContact.findOne();
    if (!contactInfo) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    res.json(contactInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

exports.updateHomeContact = catchAsyncErrors(async (req, res) => {
  const {
    phone,
    whatsappLink,
    hours1,
    hours2,
    hours3,
    hours4,
    hours5,
    hours6,
    hours7,
    address,
  } = req.body;

  try {
    let contactInfo = await HomeContact.findOne();
    if (!contactInfo) {
      contactInfo = new HomeContact({
        phone,
        whatsappLink,
        hours1,
        hours2,
        hours3,
        hours4,
        hours5,
        hours6,
        hours7,
        address,
      });
    } else {
      contactInfo.phone = phone;
      contactInfo.whatsappLink = whatsappLink;
      contactInfo.hours1 = hours1;
      contactInfo.hours2 = hours2;
      contactInfo.hours3 = hours3;
      contactInfo.hours4 = hours4;
      contactInfo.hours5 = hours5;
      contactInfo.hours6 = hours6;
      contactInfo.hours7 = hours7;
      contactInfo.address = address;
    }
    await contactInfo.save();
    res.json({ message: "Contact information updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
