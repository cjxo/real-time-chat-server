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
};
