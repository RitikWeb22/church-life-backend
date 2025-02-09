// backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    coverImage: { type: String, default: '' }, // will store the Cloudinary secure URL
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
