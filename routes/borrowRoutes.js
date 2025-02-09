const express = require('express');
const router = express.Router();
const {
  createBorrowRecord,
  getMyBorrowRecords,
  getAllBorrowRecords,
  updateBorrowRecord,
} = require('../controllers/borrowController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createBorrowRecord)  // Any authenticated user can borrow a book
  .get(protect, admin, getAllBorrowRecords);  // Only admin can view all records

router.route('/myrecords').get(protect, getMyBorrowRecords);

router.route('/:id').put(protect, admin, updateBorrowRecord);

module.exports = router;
