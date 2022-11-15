const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const { app } = require("./app");

const { HOST_DB, PORT = 3000 } = process.env;

async function main() {
  try {
    if (!HOST_DB) {
      throw new Error("HOST_DB not set!");
    }

    await mongoose.connect(HOST_DB);
    console.log("connected to mongodb");

    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}
main();
