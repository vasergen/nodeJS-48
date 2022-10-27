const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());

// req - request, parsed http request
// res - response, with methods
app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.get("/users", (req, res) => {
  res.send("<h1>Users:</h1>");
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
