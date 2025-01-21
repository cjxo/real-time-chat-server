const express = require("express");
const message = require("../controllers/message");
const { jwt } = require("../lib/utils");
const messageRouter = express.Router();

messageRouter.get("/messages", jwt.verify, message.getAll);

module.exports = messageRouter;
