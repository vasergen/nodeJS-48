const movies = [
  { id: 1, name: "The godfather" },
  { id: 2, name: "Inception" },
];

const express = require("express");
const app = express();

app.get("/api/movies", (req, res) => {
  const { limit } = req.query;
  console.log("limit:", limit);

  return res.status(200).json({ data: { movies: movies.slice(-limit) } });
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
