const express = require("express");

const app = express();

// req - request, parsed http request
// res - response, with methods
app.get("/", (req, res) => {
  res.json({ a: 1, b: 2 });
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
