const express = require("express");
const auth = require("../controllers/auth");
const { jwt } = require("../lib/utils");;
const authRouter = express.Router();

authRouter.post("/sign-up", auth.signUp);
authRouter.post("/sign-in", auth.signIn);
authRouter.post("/sign-out", auth.signOut);
authRouter.get("/is-auth", jwt.verify, auth.isAuth);

module.exports = authRouter;
