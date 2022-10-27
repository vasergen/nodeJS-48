const fs = require("fs");

function handleFile(error, data) {
  if (error) {
    return console.error("Got error", error);
  }
  console.log("Got data!");
  blockEventLoopForMs(5000);
}

console.log("start");
fs.readFile("./movies.txt", "utf8", handleFile);
fs.readFile("./movies.txt", "utf8", handleFile);
console.log("finish");

function blockEventLoopForMs(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}
