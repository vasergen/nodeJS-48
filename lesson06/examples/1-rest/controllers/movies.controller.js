const { Movie } = require("../models/movie.model");
const { createNotFoundHttpError } = require("../helpers");

async function getAll(req, res, next) {
  const movies = await Movie.find();

  return res.json({
    data: movies,
  });
}

async function create(req, res, next) {
  // TODO: add joi validation
  const createdMovie = await Movie.create(req.body);
  return res.status(201).json({
    data: {
      movie: createdMovie,
    },
  });
}

async function deleteById(req, res, next) {
  const { id } = req.params;

  // 1
  // await Movie.findByIdAndDelete(id);
  // return res.status(204).json({});

  // 2
  const movie = await Movie.findById(id);
  if (movie) {
    await Movie.findByIdAndDelete(id);
    return res.json({ data: { movie } });
  }
  return next(createNotFoundHttpError());
}

async function updateById(req, res, next) {
  const { id } = req.params;
  const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

  return res.json({ data: { movie: updatedMovie } });
}

async function findOneById(req, res, next) {
  const { id } = req.params;

  const movie = await Movie.findById(id);
  if (movie) {
    return res.json({ data: { movie } });
  }
  return next(createNotFoundHttpError());
}

module.exports = {
  getAll,
  create,
  deleteById,
  updateById,
  findOneById,
};
