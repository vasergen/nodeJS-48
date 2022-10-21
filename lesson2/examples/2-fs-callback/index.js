const fs = require("fs");
const util = require("util");

async function main() {
  // 1. read file with callback
  // fs.readFile("./movies.txt", "utf8", (error, data) => {
  //   if (error) {
  //     console.error(error);
  //   }
  //   console.log("Got movies", data);
  // });
  //
  //
  //
  // 2. sync variant
  // const movies = fs.readFileSync("./movies.txt", { encoding: "utf8" });
  // console.log("movies:", movies);
  //
  //
  const readFilePromise = util.promisify(fs.readFile);
  const data = await readFilePromise("./movies.txt", "utf8");
  console.log("data:", data);

  //
  const movies = await readFilePromise("./movies.json", "utf8");
  const moviesJSON = JSON.parse(movies);
  console.log("moviesJSON:", moviesJSON);
}

// simple promisify example
function promisify(callbackFn) {
  return (path, encoding) => {
    return new Promise((resolve, reject) => {
      callbackFn(path, encoding, (error, data) => {
        if (error) {
          return reject(error);
        }

        return resolve(data);
      });
    });
  };
}

main();
