const Answer = require('../models/answer.models');
const Question = require('../models/question.models');
const Notification = require('../models/notification.models');

exports.createAnswer = async (req, res) => {
  try {
    const { questionId, text } = req.body;

    const newAnswer = await Answer.create({
      questionId,
      authorId: req.user.userId,
      text
    });

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const answerCount = await Answer.countDocuments({ questionId });

    let message;
    if (answerCount === 1) {
      message = `Your question "${question.title}" has received its first answer!`;
    } else {
      message = `Your question "${question.title}" has received more answers!`;
    }

    // Don’t notify if user answers own question
    if (question.authorId.toString() !== req.user.userId) {
      await Notification.create({
        userId: question.authorId,
        message,
        url: `/question/${questionId}`
      });
    }

    res.status(201).json(newAnswer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({
      questionId: req.params.questionId,
      isApproved: true
    }).populate('authorId', 'username avatarUrl');

    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.voteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body; // +1 or -1
    const userId = req.user.userId;

    let answer = await Answer.findById(id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    // Remove any previous vote by this user
    answer.votes = answer.votes.filter(v => v.userId.toString() !== userId);

    // Add new vote
    answer.votes.push({ userId, value });
    await answer.save();

    // Count only upvotes
    const upvoteCount = answer.votes.filter(v => v.value === 1).length;

    // Notify on milestones: 10, 20, 30...
    const isMilestone = upvoteCount % 10 === 0 && upvoteCount > 0;
    if (isMilestone) {
      // Prevent notifying user about their own vote milestone
      if (answer.authorId.toString() !== userId) {
        await Notification.create({
          userId: answer.authorId,
          message: `🎉 Your answer just reached ${upvoteCount} upvotes! It's getting popular.`,
          url: `/question/${answer.questionId}`
        });
      }
    }

    res.json({ upvoteCount, totalVotes: answer.votes.length, answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.moderateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved, adminComment } = req.body;

    const answer = await Answer.findByIdAndUpdate(
      id,
      { isApproved, adminComment },
      { new: true }
    );

    if (!answer) {
      return res.status(404).json({ message: 'Answer not found' });
    }

    let message;
    if (isApproved) {
      message = `Your answer was reviewed and approved by an admin.`;
    } else {
      message = `Your answer was reviewed and hidden by an admin. Reason: ${adminComment || "Not relevant."}`;
    }

    await Notification.create({
      userId: answer.authorId,
      message,
      url: `/question/${answer.questionId}`
    });

    res.json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
