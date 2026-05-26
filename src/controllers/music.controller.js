const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("1. decoded:", decoded);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "You don't have access to create a music",
      });
    }

    const { title } = req.body;

    const file = req.file;

    const result = await uploadFile(file.buffer, file.originalname);

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: decoded.id,
    });

    return res.status(201).json({
      message: "Music created successfully",
      music,
    });
  } catch (error) {
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    return res.status(500).json({
      message: error.name,
      error: error.message,
    });
  }
}

module.exports = { createMusic };
