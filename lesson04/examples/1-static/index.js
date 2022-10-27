const express = require("express");
const path = require("path");

const app = express(path.join(__dirname, "static"));

app.use("/public", express.static("static"));
// app.use("/", express.static("static")); // can use any path

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
