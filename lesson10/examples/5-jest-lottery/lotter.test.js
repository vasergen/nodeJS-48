const { lottery } = require("./lottery");

const mockGenerateNumber = jest.fn();
jest.mock("./generateNumber", () => {
  return {
    generateNumber: () => mockGenerateNumber(),
  };
});

// console.log("!!!mockGenerateNumber", mockGenerateNumber);

describe("lottery", () => {
  it("should win", () => {
    mockGenerateNumber.mockImplementation(() => 5);

    const result = lottery(5);
    expect(result).toBe("You won");
  });

  it("should lost", () => {
    mockGenerateNumber.mockImplementation(() => 1);

    const result = lottery(5);
    expect(result).toBe("You lost, generated number 1");
  });
});
