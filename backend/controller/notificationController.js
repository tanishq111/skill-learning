import Notification from "../models/notification.js";


export const listNotifications = async (req, res, next) => {
  try {
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));

    const filter = { recipient: req.user.id }; // trusted: comes from the token
    if (req.query.unread === "true") filter.readAt = null;

    const [notifications, unreadCount] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).limit(limit).lean(),
      Notification.countDocuments({ recipient: req.user.id, readAt: null }),
    ]);

    res.status(200).json({ data: notifications, meta: { unreadCount } });
  } catch (err) {
    next(err);
  }
};

export const markRead = async (req, res, next) => {
  try {
    const result = await Notification.updateOne(
      { _id: req.params.id, recipient: req.user.id }, // ownership is part of the filter
      { $set: { readAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(204).end();
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid notification id" });
    }
    next(err);
  }
};

export const markAllRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, readAt: null },
      { $set: { readAt: new Date() } }
    );
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
