// import express from "express";
const express = require("express");
const connect = require("./db");
const cors = require("cors");
const app = express();
const routes = require("./routes/index.routes.js");
const authRoutes = require("./routes/auth");
var cookieParser = require("cookie-parser");

app.get("/cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "This has CORS enabled 🎈" });
});

//middelewar
app.use(cors());
app.use(cookieParser());
app.use(express.json()); //this will allow our app to take any json file from outside
// app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api", routes);
// app.use("/api", authRoutes);
// app.use("/api/videos", authVideos);
// app.use("/api/comments", authComments);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something went wrong project hub main";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8080, () => {
  connect();
  console.log("server running!!");
});
