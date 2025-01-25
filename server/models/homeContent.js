const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomePageContentSchema = new Schema({
  logoUrl: { type: String, required: true },
  heading: { type: String, required: true },
  subheading: { type: String },
});

module.exports = mongoose.model("HomePageContent", HomePageContentSchema);
