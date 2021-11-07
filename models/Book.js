const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  authorId: String
});

module.exports = mongoose.model("books", BookSchema);