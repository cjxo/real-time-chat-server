const express = require("express");
const user = require("../controllers/user");
const { jwt } = require("../lib/utils");;
const userRouter = express.Router();

userRouter.post("/update", jwt.verify, user.update);
userRouter.get("/users", jwt.verify, user.getAll);
userRouter.post("/add/:id", jwt.verify, user.add);

module.exports = userRouter;
