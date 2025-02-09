// backend/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); // store file in memory for direct upload to Cloudinary
const upload = multer({ storage });
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route: Get all books
router.route('/').get(getBooks);

// Protected routes: Create, update, and delete a book with file upload support
router
  .route('/')
  .post(protect, admin, upload.single('coverImage'), createBook);

router
  .route('/:id')
  .get(getBookById)
  .put(protect, admin, upload.single('coverImage'), updateBook)
  .delete(protect, admin, deleteBook);

module.exports = router;
