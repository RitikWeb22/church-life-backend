// backend/controllers/borrowController.js
const asyncHandler = require('express-async-handler');
const BorrowRecord = require('../models/BorrowRecord');
const Book = require('../models/Book');

// @desc    Create a new borrow record
// @route   POST /api/borrow
// @access  Private (authenticated users)
const createBorrowRecord = asyncHandler(async (req, res) => {
  const { bookId, dueDate } = req.body;
  const userId = req.user._id;

  // Check if the book exists
  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  // Optional: Check if the book is already borrowed and not returned
  const existingRecord = await BorrowRecord.findOne({ book: bookId, returned: false });
  if (existingRecord) {
    res.status(400);
    throw new Error('This book is already borrowed');
  }

  const borrowRecord = await BorrowRecord.create({
    book: bookId,
    user: userId,
    dueDate,
  });

  res.status(201).json(borrowRecord);
});

// @desc    Get borrow records for the logged-in user
// @route   GET /api/borrow/myrecords
// @access  Private
const getMyBorrowRecords = asyncHandler(async (req, res) => {
  const records = await BorrowRecord.find({ user: req.user._id })
    .populate('book', 'title coverImage')
    .sort({ createdAt: -1 });
  res.json(records);
});

// @desc    Get all borrow records (admin only)
// @route   GET /api/borrow
// @access  Private/Admin
const getAllBorrowRecords = asyncHandler(async (req, res) => {
  const records = await BorrowRecord.find({})
    .populate('book', 'title')
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
  res.json(records);
});

// @desc    Update borrow record (e.g., mark as returned)
// @route   PUT /api/borrow/:id
// @access  Private/Admin
const updateBorrowRecord = asyncHandler(async (req, res) => {
  const record = await BorrowRecord.findById(req.params.id);
  if (record) {
    record.returned = req.body.returned !== undefined ? req.body.returned : record.returned;
    const updatedRecord = await record.save();
    res.json(updatedRecord);
  } else {
    res.status(404);
    throw new Error('Borrow record not found');
  }
});

module.exports = {
  createBorrowRecord,
  getMyBorrowRecords,
  getAllBorrowRecords,
  updateBorrowRecord,
};
