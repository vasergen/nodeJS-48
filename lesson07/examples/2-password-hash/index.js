const bcrypt = require("bcrypt");

async function main() {
  const password = "123456";
  // const salt = await bcrypt.genSalt();
  const salt = "$2b$10$9VY.SDiKukmRnaIUZ4eFFu";
  console.log("salt:", salt);

  const hash = await bcrypt.hash(password, salt);
  console.log("hash:", hash);

  // const password2 = "123456";
  // const salt2 = await bcrypt.genSalt();
  // const salt = "$2b$10$9VY.SDiKukmRnaIUZ4eFFu";
  // console.log("salt2:", salt2);

  // const hash2 = await bcrypt.hash(password, salt2);
  // console.log("hash2:", hash2);

  // check if password correct
  const userInput = "12345";
  const isTheSame = await bcrypt.compare(userInput, hash);

  // how compare approximately works:
  // salt = getSaltFromHash(hash)
  // bcrypt.hash(userInput + salt) => $2b$10$9VY.SDiKukmRnaIUZ4eFFukX6DjsdO3UOO5.ZoOQdlryHh5VmLxc.
  // check if our generatedHash the same as the one in db
  console.log("isTheSame:", isTheSame);
}

main();
