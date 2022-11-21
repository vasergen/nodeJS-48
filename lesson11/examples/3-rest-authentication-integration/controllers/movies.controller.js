const { Movie } = require("../models/movie.model");
const { createNotFoundHttpError } = require("../helpers");
const fs = require("fs/promises");
const path = require("path");

async function getAll(req, res, next) {
  const { limit, page } = req.query;
  console.log(":", limit, page);

  const skip = (page - 1) * limit;
  const movies = await Movie.find({}).skip(skip).limit(limit);

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

async function changeImageUrl(req, res, next) {
  // 1 - save file in public/images
  console.log(req.file);
  const newPath = path.join(__dirname, "../public/images", req.file.filename);
  await fs.rename(req.file.path, newPath);

  // 2
  const movieId = req.params.id;
  console.log(req.params.id);
  const movieImage = "/public/images/" + req.file.filename;

  const movieS = await Movie.findById(movieId);
  console.log(movieS);

  const savedMovie = await Movie.findByIdAndUpdate(
    movieId,
    {
      image: movieImage,
    },
    { new: true }
  );

  return res.status(201).json({ data: { movie: savedMovie } });
}

module.exports = {
  getAll,
  create,
  deleteById,
  updateById,
  findOneById,
  changeImageUrl,
};
