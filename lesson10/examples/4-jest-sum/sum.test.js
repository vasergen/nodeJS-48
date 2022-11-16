const { sum } = require("./sum");

describe("sum", () => {
  // afterAll(() => {
  //   console.log("afterAll");
  // });
  // beforeAll(() => {
  //   console.log("beforeAll");
  // });

  // afterEach(() => {
  //   console.log("afterEach");
  // });
  // beforeEach(() => {
  //   console.log("beforeEach");
  // });

  it("1 + 1 should return 2", () => {
    const result = sum(1, 1);
    expect(result).toBe(2);
  });

  it("-1 + 2 should return 1", () => {
    const result = sum(-1, 2);
    expect(result).toBe(1);
  });
});
