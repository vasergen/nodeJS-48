const { generateNumber } = require("./generateNumber");

function lottery(number) {
  const generatedNumber = generateNumber();

  if (number === generatedNumber) {
    return "You won";
  }

  return `You lost, generated number: ${generatedNumber}!`;
}

module.exports = {
  lottery,
};
