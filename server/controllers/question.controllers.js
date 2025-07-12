const Question = require('../models/questions.models');

exports.createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const newQuestion = await Question.create({
      title,
      description,
      tags,
      authorId: req.user.userId,
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('authorId', 'username avatarUrl')
      .sort({ createdAt: -1 });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSingleQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('authorId', 'username avatarUrl');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchQuestions = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const questions = await Question.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } }
      ]
    });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
