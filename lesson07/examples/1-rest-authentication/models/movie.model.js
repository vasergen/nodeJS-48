const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  datePublished: {
    type: String,
    required: true,
    match: /\d\d\d\d-\d\d-\d\d/,
  },
  actors: [{ name: String }],
  directors: [{ name: String }],
  duration: {
    type: String,
  },
  genre: {
    type: String,
    enum: ["crime", "drama"],
    required: true,
  },
  image: String,
  rating: Number,
});

const Movie = model("movie", movieSchema);

module.exports = {
  Movie,
};
