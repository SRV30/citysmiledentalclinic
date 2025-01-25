const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then((data) => console.log(`Mongodb connected with server: `))
  .catch((error) => console.log(error));

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

const user = require("./routes/userRoutes");
const logo = require("./routes/logoHome");
const contactRoutes = require("./routes/contactRoutes");
const imagesRoutes = require("./routes/imageRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const service = require("./routes/serviceRoutes");
const homeAbout = require("./routes/homeAboutRoutes");
const homeContact = require("./routes/homeContactRoute");

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Server is running " + PORT,
  });
});

app.use("/api", user);
app.use("/api", logo);
app.use("/api", contactRoutes);
app.use("/api", imagesRoutes);
app.use("/api", aboutRoutes);
app.use("/api", service);
app.use("/api", homeAbout);
app.use("/api", homeContact);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
