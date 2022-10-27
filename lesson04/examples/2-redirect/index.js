const express = require("express");

const app = express();

app.get("/myhome", (req, res) => {
  // return res.send(`<h1>My home<h1>`);
  const redirectCode = 301;
  return res.redirect(redirectCode, "/home");
});

app.get("/home", (req, res) => {
  return res.send(`<h1>home<h1>`);
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
