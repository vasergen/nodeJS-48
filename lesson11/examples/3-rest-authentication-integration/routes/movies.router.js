const express = require("express");
const movieController = require("../controllers/movies.controller");
const { tryCatchWrapper } = require("../helpers");
const { upload } = require("../middlewares/uploadFile");

const moviesRouter = express.Router();

moviesRouter.get("/", tryCatchWrapper(movieController.getAll));
moviesRouter.post("/", tryCatchWrapper(movieController.create));
moviesRouter.delete("/:id", tryCatchWrapper(movieController.deleteById));
moviesRouter.put("/:id", tryCatchWrapper(movieController.updateById));
moviesRouter.get("/:id", tryCatchWrapper(movieController.findOneById));

//
moviesRouter.patch(
  "/:id/image",
  tryCatchWrapper(upload.single("image")), // save it tmp directory
  tryCatchWrapper(movieController.changeImageUrl)
);

module.exports = {
  moviesRouter,
};
