import maxProfit from "./maxProfit";

describe("test maxProfit", () => {
  test("result = 0", () => {
    expect(maxProfit([1, 1, 0])).toBe(0);
  });
  test("result = 6", () => {
    expect(maxProfit([1, 5, 7, 4, 6])).toBe(6);
  });
  test("result = 5", () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
  });
  test("result = 19", () => {
    expect(maxProfit([3, 2, 1, 2, 7, 20, 15])).toBe(19);
  });
});
