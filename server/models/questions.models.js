const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // HTML from editor
  tags: [String],
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  views: { type: Number, default: 0 },
  isAnswered: { type: Boolean, default: false }
});

module.exports = mongoose.model('Question', questionSchema);
