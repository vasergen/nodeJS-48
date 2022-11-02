const mongoose = require("mongoose");

const HOST_DB = "mongodb+srv://admin:Vo3yAo3tdfdmV7RP@cluster0.dl6jmg6.mongodb.net/moviesReader";

async function main() {
  try {
    await mongoose.connect(HOST_DB);
    console.log("connected");
  } catch (error) {
    console.error("Error:", error.message);
  }
}
main();
