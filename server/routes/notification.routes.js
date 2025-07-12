const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, notificationController.getUserNotifications);
router.patch('/:id/read', authMiddleware, notificationController.markAsRead);

module.exports = router;
