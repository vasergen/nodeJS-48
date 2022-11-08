const express = require("express");
const authController = require("../controllers/auth.controller");
const { tryCatchWrapper } = require("../helpers");

const authRouter = express.Router();

authRouter.post("/register", tryCatchWrapper(authController.register));
authRouter.post("/login", tryCatchWrapper(authController.login));

module.exports = {
  authRouter,
};
