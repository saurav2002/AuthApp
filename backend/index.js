const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
var cookieParser = require("cookie-parser");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const name = path.resolve();
const app = express();

// const clientDistDirectory = path.join(__dirname, "client", "dist");
// app.use(express.static(clientDistDirectory));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(clientDistDirectory, "index.html"));
// });

// for parsing json data
app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// for uploading file
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const cloudinary = require("./config/cloudinary.js");
cloudinary.cloudinaryConnect();

const router = require("./routes/user.js");
app.use("/api/user", router);

// idhr router me jo route banaye hai unhe call krna
const signuproute = require("./routes/auth.route.js");
// const exp = require("constants");
app.use("/api/auth", signuproute);

// for handling all error we use here middlewre bss try catch k catch wale me next us krlo
// yahn me errorhandle wala function jab return hoga uski value lega ye error.js woh wala function
// aur jo idhr err likha h udhrh jab returnn ho rha
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Some Internal Issue";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
