const express = require("express");

const moviesRouter = express.Router();

const movies = [{ name: "The Godfather", id: 1 }];

moviesRouter.get("/", (req, res) => {
  res.json(movies);
});

moviesRouter.get("/:id", (req, res) => {
  res.json(movies[0]);
});

moviesRouter.post("/:id", (req, res) => {
  res.status(201).json({
    id: 2,
    name: "Inception",
  });
});

module.exports = {
  moviesRouter,
};
