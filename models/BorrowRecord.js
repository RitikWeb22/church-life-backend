const mongoose = require('mongoose');

const borrowRecordSchema = mongoose.Schema(
  {
    book: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Book', 
      required: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    borrowedAt: { 
      type: Date, 
      default: Date.now 
    },
    dueDate: { 
      type: Date 
    },
    returned: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BorrowRecord', borrowRecordSchema);
