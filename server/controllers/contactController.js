const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Contact = require("../models/contactModel");

exports.submitContactForm = catchAsyncErrors(async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

exports.getContactForms = catchAsyncErrors(async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

exports.deleteContactForms = catchAsyncErrors(async (req, res) => {
  try {
    const contactsToDelete = await Contact.find().sort({ date: 1 }).limit(-20);

    await Contact.deleteMany({
      _id: { $in: contactsToDelete.map((contact) => contact._id) },
    });

    res.status(200).json({ message: "Old messages deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
