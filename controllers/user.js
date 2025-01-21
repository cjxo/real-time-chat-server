const db = require("../db/query");

module.exports = {
  update: async (req, res, next) => {
    try {
      const { first_name, last_name, email, bio } = req.body;
      const user = await db.user.getById(req.userId);

      const updated = {};

      if (first_name) {
        updated.first_name = first_name;
      }

      if (last_name) {
        updated.last_name = last_name;
      }

      if (email) {
        const existingUserWithEmail = await db.user.getByEmail(email);
        if (existingUserWithEmail && (existingUserWithEmail.id !== user.id)) {
          return res.status(400).json({ message: "Email is already taken" });
        }
        updated.email = email;
      }

      if (bio) {
        updated.bio = bio;
      }
      
      if (Object.keys(updated).length > 0) {
        const updatedUser = await db.user.update(req.userId, updated);

        /*for (let i = 0; i < 10000000000; ++i) {
        }*/
        return res.json({ message: "Update Success", user: updatedUser });
      }

      return res.status(400).json({ message: "No fields to update" });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const users = await db.user.getAll(req.userId);
      res.json({ message: "Request Granted", users });
    } catch (err) {
      next(err);
    }
  },

  add: async (req, res, next) => {
    try {
      await db.user.add(req.userId, req.params.id);
      res.status(201).json({ message: "Add successfully" })
    } catch (err) {
      next(err);
    }
  },
};
