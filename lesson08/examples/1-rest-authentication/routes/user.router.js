const express = require("express");
const usersController = require("../controllers/users.controller");
const { tryCatchWrapper } = require("../helpers");
const { auth } = require("../middlewares/auth");

const usersRouter = express.Router();

usersRouter.get("/movies", tryCatchWrapper(auth), tryCatchWrapper(usersController.getMovies));
usersRouter.post("/movies", tryCatchWrapper(auth), tryCatchWrapper(usersController.createMovie));

module.exports = {
  usersRouter,
};
