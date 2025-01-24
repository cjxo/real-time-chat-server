const db = require("../db/query");
const { sockio, getSocketId } = require("../lib/socket");

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
      sockio.to(getSocketId(req.params.id)).emit("new message", newMessage);
      res.status(201).json({ message: "Message Sent", newMessage });
    } catch (err) {
      next(err);
    }
  },

  get: async (req, res, next) => {
    try {
      const message = await db.message.get(req.userId, req.params.id);
      res.json({ message: "Request granted", theMessage: message });
    } catch (err) {
      next(err);
    }
  },
};
