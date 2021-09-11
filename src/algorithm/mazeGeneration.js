import { NUM_BOX } from "../constants";
import { getPathNeighbor, shuffle } from "./helper";

export const generateDfsMaze = (startNode, targetNode) => {
  let initialPoint = Math.floor(Math.random() * (NUM_BOX - 1));
  while (initialPoint === startNode || initialPoint === targetNode) {
    initialPoint = Math.floor(Math.random() * (NUM_BOX - 1));
  }

  let visited = new Set();
  let stack = [{ n: initialPoint }];
  let path = [];

  while (stack.length > 0) {
    const pathIndex = stack.pop();

    if (!visited.has(pathIndex.n)) {
      pathIndex.w && path.push(pathIndex.w);
      path.push(pathIndex.n);

      visited.add(pathIndex.n);

      const neighbors = getPathNeighbor(pathIndex.n, 2);
      shuffle(neighbors)
      console.log(neighbors);

      neighbors
        .filter((neighborId) => !visited.has(neighborId.n))
        .forEach((neighborId) => {
          console.log('nid', neighborId)
          stack.push(neighborId);
        });
    }
  }

  console.log(visited)
  console.log(path);

  return path;
};
