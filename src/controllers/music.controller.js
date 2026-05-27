const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {
  const token = req.cookies.token;

  const { title } = req.body;

  const file = req.file;

  const result = await uploadFile(file.buffer, file.originalname);

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  return res.status(201).json({
    message: "Music created successfully",
    music,
  });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics,
  });

  return res.status(201).json({
    message: "Album Created Successfully",
    album: {
      id: album._id,
      title: album.title,
      musics: album.musics,
    },
  });
}

async function getAllMusics(req, res) {
  // const musics = await musicModel.find(); since we have artist id so we can use populate to get artist detail as well

  const musics = await musicModel
    .find()
    .limit(10)
    .populate("artist", "username email"); // usrname and email for we want only 2 properties of artist if we pass nothing we can every detail about artist

    // you can also use .skip for pagenation
  res.status(200).json({
    message: "music fetched successfully",
    musics: musics,
  });
}

async function getAllAlbums(req, res) {
  // const albums = await albumModel.find().populate("artist", "username");

  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");

  res.status(200).json({
    message: "Album fetched successfully",
    albums: albums,
  });
}

async function getAlbumId(req, res) {
  const albumId = req.params.albumId;

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username");

  return res.status(200).json({
    message: "Album's music fetched successfully",
    album: album,
  });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumId,
};
