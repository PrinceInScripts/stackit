const Notification = require('../models/notification.models');

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.userId
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
