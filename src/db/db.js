const mongoose = require("mongoose");

const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDB;

// see in package.json // Add this line to start the server with Node.js better for production we don't wnat to restart the server on every change in production

// npm i bcryptjs for hashing
// properties of hashing => same password will be having same hash and we can't go back to the hash from the text

// npm i multer 

/* properties of middleware 
1. middleware can read the data which is in request
2. middleware can modify the request data
3. middleeare can send response as well 

next in the middleware means ("/album", authMiddleware.authArtist, musicController.createAlbum);  move to the right side


*/
