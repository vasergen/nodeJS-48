const movies = [
  { id: 1, name: "The godfather" },
  { id: 2, name: "Inception" },
];

const express = require("express");
const app = express();

app.use((req, res, next) => {
  next();
});

app.get("/api/error", (req, res) => {
  if (true) {
    //
    throw new Error("Something bad happened!");
  }

  res.status(200).json({});
});

// at the end - after all other routes
app.use((err, req, res, next) => {
  console.error("Got error: ", err.message, err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3001, () => {
  console.log("server is listening on port 3001");
});
