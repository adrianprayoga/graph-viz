import QuickUnionFind from "./quickUnionFind.js";

test("disjoint sets", () => {
  let disjointSets = new QuickUnionFind([1, 2, 3, 4, 5, 6, 7]);
  expect(disjointSets.isConnected(1, 2)).toBe(false);

  // 2 3 4
  disjointSets.connect(3, 4);
  expect(disjointSets.isConnected(3, 4)).toBe(true);
  disjointSets.connect(2, 3);
  expect(disjointSets.isConnected(2, 4)).toBe(true);
  expect(disjointSets.isConnected(1, 2)).toBe(false);

  // 1 7 5
  disjointSets.connect(1, 7);
  disjointSets.connect(1, 5);
  expect(disjointSets.isConnected(5, 1)).toBe(true);

  disjointSets.connect(2, 5);
  expect(disjointSets.isConnected(1, 4)).toBe(true);
});
