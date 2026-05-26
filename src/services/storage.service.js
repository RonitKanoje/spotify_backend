const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(fileBuffer, originalName) {
  const result = await imageKitClient.files.upload({
    file: await toFile(fileBuffer, originalName),
    fileName: "music_" + Date.now(),
    folder: "/SPOTIFY_BACKEND/music",
  });

  console.log("ImageKit result:", result); // check actual field name
  return result;
}

module.exports = { uploadFile };
