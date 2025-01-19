const express = require("express");
const user = require("../controllers/user");
const { jwt } = require("../lib/utils");;
const userRouter = express.Router();

userRouter.post("/update", jwt.verify, user.update);

module.exports = userRouter;
