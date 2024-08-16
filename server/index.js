require("dotenv").config();

const express = require("express");
const app = express();

const MongoDB = require("./db");
const cors = require("cors");

const cloudinary = require("cloudinary").v2;

app.use(cors());
app.use(
  express.json({
    limit: "20mb",
  })
);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const port = process.env.PORT || 5000;

// Function to connect with database
MongoDB();

app.get("/", (req, res) => {
  res.json("Hello");
});

// Routes that will be used
app.use("/api", require("./Routes/AddProduct"));
app.use("/api", require("./Routes/LoginRoute"));
app.use("/api", require("./Routes/DisplayProduct"));
app.use("/api", require("./Routes/EditProduct"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
