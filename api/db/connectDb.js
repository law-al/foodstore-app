const mongoose = require("mongoose");

function connectDb(uri) {
  return mongoose.connect(uri);
}

module.exports = connectDb;
