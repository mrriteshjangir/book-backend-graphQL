const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
});

module.exports = mongoose.model("authors", AuthorSchema);