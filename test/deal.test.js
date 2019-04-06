const Deal = require("../util/deal");

test('adds 1 + 2 to equal 3', () => {
  expect(Deal.sum(1, 2)).toBe(3);
});
