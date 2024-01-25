# File Handling in Node.js with Express, Multer, and Cloudinary

## Overview
In your organization, file handling is not done on its own servers, but a combination of local storage and a third-party service like Cloudinary is used. The process involves two steps: uploading files to the local server using Multer and subsequently uploading them to Cloudinary.

## Technologies Used
- **Multer:** A middleware for handling `multipart/form-data` in Node.js, commonly used with Express for file uploads.
- **Cloudinary:** A cloud-based platform for image and video management, providing cloud storage and processing.

## Two-Step File Uploading Process
1. **Local Server Upload using Multer:**
   - Multer middleware is configured in your Express application to handle file uploads locally.
2. **Upload Local Files to Cloudinary:**
   - After local upload, files are then uploaded to Cloudinary using their APIs or SDKs.

## Express File Upload and Multer Example
```javascript
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();

// Multer configuration for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'your_cloudinary_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  // File is uploaded locally, and you can now upload it to Cloudinary
  const filePath = req.file.path;

  cloudinary.uploader.upload(filePath, (error, result) => {
    if (error) {
      return res.status(500).send(error.message);
    }

    // Cloudinary upload successful, you can handle the result as needed
    res.json(result);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```