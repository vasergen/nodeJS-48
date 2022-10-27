import fs from "fs/promises";

// 1. create file
await fs.writeFile("./movies.txt", "The Godfather\n");
// await fs.writeFile("./movies.txt", "Inception");

// 2. append text to file
await fs.appendFile("./movies.txt", "Inception\n");

// 3. delete file
// await fs.unlink("./movies.txt");
// console.log("result:", result);

// 4. delete "The godFather"
const movies = await fs.readFile("./movies.txt", "utf8");
const newMovies = movies.split("\n").slice(1).join("\n");
await fs.writeFile("./movies.txt", newMovies);
