const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const { HOST_DB } = process.env;

async function main() {
  try {
    if (!HOST_DB) {
      throw new Error("HOST_DB not set!");
    }

    await mongoose.connect(HOST_DB);
    console.log("connected");
  } catch (error) {
    console.error("Error:", error.message);
  }
}
main();
