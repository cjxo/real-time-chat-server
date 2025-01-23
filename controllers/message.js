const db = require("../db/query");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const userId = req.userId;
      const messages = await db.message.getAll(userId);
      res.json({ message: "Request granted", messages });
    } catch (err) {
      next(err);
    }
  },

  send: async (req, res, next) => {
    try {
      const newMessage = await db.message.insert(req.userId, req.params.id, req.body.message);
      res.status(201).json({ message: "Message Sent", newMessage });
    } catch (err) {
      next(err);
    }
  },
};
