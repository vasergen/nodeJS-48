const express = require("express");
const { moviesRouter } = require("./routes/movies.router");
const { authRouter } = require("./routes/auth.router");
const { usersRouter } = require("./routes/user.router");

const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/user", usersRouter);

app.use("/", (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(`app error: ${err.message}, ${err.name}`);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
});

module.exports = {
  app,
};
