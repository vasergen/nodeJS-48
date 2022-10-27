const movies = [
  { id: 1, name: "The godfather" },
  { id: 2, name: "Inception" },
];

const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("combined"));

app.get("/api/movies", (req, res) => {
  console.log("req.headers:", req.headers); // headers are in req.headers

  res.status(200).json({ data: { movies } });
});

// at the end - after all other routes
app.use((err, req, res, next) => {
  console.error("Got error: ", err.message, err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
