const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, answerController.createAnswer);

router.get('/:questionId', answerController.getAnswersByQuestion);

router.patch('/:id/vote', authMiddleware, answerController.voteAnswer);

router.patch('/:id/moderate', authMiddleware, answerController.moderateAnswer);

module.exports = router;
