const express = require("express");

const app = express();

const movies = [
  { id: 1, name: "The godfather" },
  { id: 2, name: "Inception" },
];

app.get("/api/movies/:id", (req, res) => {
  const { id } = req.params;

  const movie = movies.find((movie) => String(movie.id) === id);
  if (movie) {
    return res.json({ data: { movie } });
  }

  return res.status(404).json({ message: "Not Found" });
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
