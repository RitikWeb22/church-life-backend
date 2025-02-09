// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, updateUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// GET all users (admin only)
router.route('/').get(protect, admin, getUsers);

// PUT update user (admin only)
router.route('/:id').put(protect, admin, updateUser);

module.exports = router;
