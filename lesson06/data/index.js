const fs = require("fs/promises");

async function main() {
  const data = await fs.readFile("./top250.json", "utf8");
  const dataJSON = JSON.parse(data);

  const updData = dataJSON.map(({ name, actor, director, datePublished, duration, genre, image, aggregateRating }) => {
    return {
      name,
      datePublished,
      actors: actor.map((a) => {
        return {
          name: a.name,
        };
      }),
      directors: director.map((a) => {
        return { name: a.name };
      }),
      duration,
      genre,
      image,
      rating: {
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
      },
    };
  });

  await fs.writeFile("./movies.json", JSON.stringify(updData, null, 2));
}
main();
