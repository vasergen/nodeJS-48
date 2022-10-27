const express = require("express");
const cors = require("cors");
const { moviesRouter } = require("./routes");
const { logRequest } = require("./middlewares");

const app = express();
app.use(logRequest);
app.use("/api/movies", moviesRouter);

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
