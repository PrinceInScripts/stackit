const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

// Auth required for posting
router.post('/', authMiddleware, questionController.createQuestion);

router.get('/', questionController.getAllQuestions);

router.get('/:id', questionController.getSingleQuestion);

router.get('/search/:keyword', questionController.searchQuestions);

module.exports = router;
