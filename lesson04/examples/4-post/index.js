const movies = [
  { id: 1, name: "The godfather" },
  { id: 2, name: "Inception" },
];

const express = require("express");
const { nanoid } = require("nanoid");
const Joi = require("joi");
const app = express();

app.use(express.json()); // tell express to work with JSON in body when we have post method
app.get("/api/movies/:id", (req, res) => {
  const { id } = req.params;

  const movie = movies.find((movie) => String(movie.id) === id);
  if (movie) {
    return res.json({ data: { movie } });
  }

  return res.status(404).json({ message: "Not Found" });
});

app.post("/api/movies", (req, res) => {
  const { name } = req.body;

  // own validation
  // if (typeof name !== "string") {
  //   return res.status(400).json({
  //     error: "name is required",
  //   });
  // }

  // joi validation
  const schema = Joi.object({
    name: Joi.string().required().min(3),
  });

  const { error } = schema.validate({ name });
  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  // logic
  const id = nanoid();
  const newMovie = {
    id,
    name,
  };

  movies.push(newMovie);

  return res.status(201).json(newMovie);
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
