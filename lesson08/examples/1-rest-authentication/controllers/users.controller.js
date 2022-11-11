const { User } = require("../models/user.model");
const { Conflict, Unauthorized } = require("http-errors");
const { User: UserModel } = require("../models/user.model");

async function getMovies(req, res, next) {
  const { user } = req;

  // const movies = await UserModel.find(user._id).populate("movies");

  return res.status(200).json({
    data: {
      movies,
    },
  });
}

async function createMovie(req, res, next) {
  const { _id } = req.body; // movie id
  const { user } = req;

  // TODO: add check if the movie is bough already!
  user.movies.push({
    _id,
  });

  await UserModel.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    data: {
      movies: user.movies,
    },
  });
}

module.exports = {
  getMovies,
  createMovie,
};
