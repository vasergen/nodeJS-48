const gravatar = require("gravatar");

const result = gravatar.url("emerleite@gmail.com", { s: "200", r: "pg", d: "404" });
console.log(result);
