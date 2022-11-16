const jimp = require("jimp");

async function main() {
  const image = await jimp.read("./images/1.jpeg");
  await image.resize(50, 50);
  await image.writeAsync("./processed-images/1.jpeg");
  console.log("Finish resizing");
}
main();
