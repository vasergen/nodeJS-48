const express = require("express");
const movieController = require("../controllers/movies.controller");
const { tryCatchWrapper } = require("../helpers");

const moviesRouter = express.Router();

moviesRouter.get("/", tryCatchWrapper(movieController.getAll));
moviesRouter.post("/", tryCatchWrapper(movieController.create));
moviesRouter.delete("/:id", tryCatchWrapper(movieController.deleteById));
moviesRouter.put("/:id", tryCatchWrapper(movieController.updateById));
moviesRouter.get("/:id", tryCatchWrapper(movieController.findOneById));

module.exports = {
  moviesRouter,
};
