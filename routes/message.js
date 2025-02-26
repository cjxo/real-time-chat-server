const express = require("express");
const message = require("../controllers/message");
const { jwt } = require("../lib/utils");
const messageRouter = express.Router();

messageRouter.get("/messages", jwt.verify, message.getAll);
messageRouter.get("/messages/:id", jwt.verify, message.get);
messageRouter.post("/send/:id", jwt.verify, message.send);

module.exports = messageRouter;
