const express = require("express");
const multer = require("multer");
const cors = require("cors"); // Import the cors package
const app = express();
const port = 4000;

app.use(cors()); // Enable CORS for all routes

const upload = multer({ dest: "uploads/" });

app.post("/audioUpload", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  // Process and handle the uploaded audio file here

  res.send("File uploaded successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
