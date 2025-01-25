const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Service = require("../models/serviceModel");

const getServices = catchAsyncErrors(async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const createService = catchAsyncErrors(async (req, res) => {
  const { title, image, alt, description } = req.body;

  const newService = new Service({
    title,
    image,
    alt,
    description,
  });

  try {
    const createdService = await newService.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteService = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }

    await service.deleteOne();
    res.status(200).json({ message: "Service deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { getServices, createService, deleteService };
