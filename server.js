require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const errorHandler = require("./middleware/errorHandler");
const coursesRoutes = require("./routes/courseRoutes");
const photogalleryRoutes = require("./routes/photogalleryRoutes");
const videogalleryRoutes = require("./routes/videogalleryRoutes");
const trainersRoutes = require("./routes/trainersRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Student Management API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/addstudent", studentRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/photogallery", photogalleryRoutes);
app.use("/api/videogallery", videogalleryRoutes);
app.use("/api/trainers", trainersRoutes);
app.use("/api/registration", registrationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/uploads/photos", express.static("uploads/photos"));
app.use("/uploads/videos", express.static("uploads/videos"));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
