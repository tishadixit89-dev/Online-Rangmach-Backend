const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Detect environment
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

// Use correct upload path
const uploadPath = isServerless
  ? "/tmp/uploads/videos"
  : path.join(__dirname, "../uploads/videos");

// Ensure folder exists (safe)
try {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
} catch (err) {
  console.error("Error creating upload folder:", err.message);
}

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// File filter (only videos)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files allowed"), false);
  }
};

// Upload config
const uploadVideo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

module.exports = uploadVideo;
