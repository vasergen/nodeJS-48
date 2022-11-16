const { sum } = require("./sum");

// Test: code which tests code
const result = sum(1, 1);
if (result !== 2) {
  throw new Error("Expect result to be 2");
} else {
  console.log("Success!");
}
