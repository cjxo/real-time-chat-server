const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
const { app, server } = require("./lib/socket.js");

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/message", messageRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Real Time Chat API." });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  console.error(err.stack);
  res.status(500).json({ message: err.stack });
});

 server.listen(3000, () => {
  console.log("Server Listening at port 3000");
});
