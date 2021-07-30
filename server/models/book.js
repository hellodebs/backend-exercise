const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 80,
    },
    author: { type: String, required: true },
    isRead: { type: Boolean, required: false },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
