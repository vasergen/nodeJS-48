const movies = [
  { id: 1, name: "The godfather" },
  { id: 2, name: "Inception" },
];

const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("combined"));

app.delete("/api/movies/:id", (req, res) => {
  // add code to remove movie by id, take id from req.params
  res.status(204).json();
});

// error handling
app.use((err, req, res, next) => {
  console.error("Got error: ", err.message, err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
