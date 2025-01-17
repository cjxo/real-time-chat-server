const db = require("../db/query");
const bcrypt = require("bcryptjs");
const { jwt } = require("../lib/utils");

module.exports = {
  signUp: async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;

    try {
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
      }

      const user = await db.user.getByEmail(email);
      if (user) {
        return res.status(400).json({ message: "Email is already being used" });
      }

      const hashed = await bcrypt.hash(password, 10);
      const result = await db.user.insert(first_name, last_name, hashed, email);

      res.status(201).json({ message: "Success. Please Sign In", user: result });
    } catch (err) {
      next(err);
    }
  },

  signIn: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await db.user.getByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Email does not exist" });
      }

      const passwordsMatched = await bcrypt.compare(password, user.password_hashed);
      if (!passwordsMatched) {
        return res.status(400).json({ message: "Wrong password" });
      }

      jwt.set({ userId: user.id }, res).json({ message: "Successfully Signed In", user: { ...user, password_hashed: undefined } });
    } catch (err) {
      next(err);
    }
  },

  signOut: async (req, res, next) => {
    res.clearCookie("remember_me_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }).json({ message: "Sign Out Successful." });
  },

  isAuth: async (req, res, next) => {
    try {
      const user = await db.user.getById(req.userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      res.json({ message: "Is authenticated", user: { ...user, password_hashed: undefined } });
    } catch (err) {
      next(err);
    }
  },
};
