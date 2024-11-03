const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  //Connection
  return mongoose
    .connect(url)
    .then(() => console.log("Database Connected Successfully !!"))
    .catch((err) => console.log("Mongo Error", err));
}

module.exports = { connectToMongoDB };
