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

      const fullNeighbors = getPathNeighbor(pathIndex.n, 2);
      const filteredNeighbors = fullNeighbors.filter(
        (neighborId) => !visited.has(neighborId.n)
      );
      shuffle(filteredNeighbors);

      filteredNeighbors.forEach((neighborId) => {
        stack.push(neighborId);
      });

      // if (filteredNeighbors.length > 0) {
      //   console.log("neighbors ok ", pathIndex.n, fullNeighbors, filteredNeighbors);
      //   stack.push(filteredNeighbors[0]);
      // } else {
      //   console.log("neighbors nok", pathIndex.n, fullNeighbors, filteredNeighbors);
      // }

      // console.log(stack);
      // console.log(path);
    }
  }

  path.reverse();
  return path;
};
