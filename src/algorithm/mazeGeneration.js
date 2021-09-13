import { NUM_BOX } from "../constants";
import {
  getIndexFromXY,
  getPathNeighbor,
  getXYFromIndex,
  isValidLocation,
  shuffle,
} from "./helper";
import QuickUnionFind from "./quickUnionFind";

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
    }
  }

  path.reverse();
  return path;
};

export const generatePrimsMaze = (startNode, targetNode) => {
  let initialPoint = Math.floor(Math.random() * (NUM_BOX - 1));
  while (initialPoint === startNode || initialPoint === targetNode) {
    initialPoint = Math.floor(Math.random() * (NUM_BOX - 1));
  }

  let visited = new Set();
  let stack = [{ n: initialPoint }];
  let path = [];

  while (stack.length > 0) {
    shuffle(stack);
    const pathIndex = stack.pop();

    if (!visited.has(pathIndex.n)) {
      pathIndex.w && path.push(pathIndex.w);
      path.push(pathIndex.n);

      visited.add(pathIndex.n);

      const fullNeighbors = getPathNeighbor(pathIndex.n, 2);
      const filteredNeighbors = fullNeighbors.filter(
        (neighborId) => !visited.has(neighborId.n)
      );

      filteredNeighbors.forEach((neighborId) => {
        stack.push(neighborId);
      });
    }
  }

  path.reverse();
  return path;
};

export const generateRandomMaze = (startNode, targetNode) => {
  const wallList = [];
  for (let i = 0; i < NUM_BOX; i++) {
    if (Math.random() < 0.35 && i !== startNode && i !== targetNode) {
      wallList.push(i);
    }
  }

  return wallList;
};

export const generateBinaryMaze = (startNode, targetNode) => {
  let { nodes: initialNodes } = generateUnconnectedNodes();
  let path = [...initialNodes];

  for (let i = 0; i < initialNodes.length; i++) {
    const pos = getXYFromIndex(initialNodes[i]);
    const westNode = { x: pos.x + 2, y: pos.y };
    const southNode = { x: pos.x, y: pos.y + 2 };
    const westPath = { x: pos.x + 1, y: pos.y };
    const southPath = { x: pos.x, y: pos.y + 1 };

    const isWestValidLocation = isValidLocation(westNode, {}, true);
    const isNorthValidLocation = isValidLocation(southNode, {}, true);

    if (isNorthValidLocation && !isWestValidLocation) {
      path.push(getIndexFromXY(southPath));
    } else if (!isNorthValidLocation && isWestValidLocation) {
      path.push(getIndexFromXY(westPath));
    } else if (isNorthValidLocation && isWestValidLocation) {
      const r = Math.random();
      if (r < 0.5) {
        path.push(getIndexFromXY(southPath));
      } else {
        path.push(getIndexFromXY(westPath));
      }
    }
  }

  path.reverse();
  return path;
};

export const generateKruskalMaze = (startNode, targetNode) => {
  let { nodes: initialNodes, walls } = generateUnconnectedNodes();
  let path = [...initialNodes];
  let quickUnionFind = new QuickUnionFind(initialNodes);
  let wallList = [...walls];
  shuffle(wallList);

  let edgesCount = 0;
  while (edgesCount < initialNodes.length - 1 && wallList.length > 0) {
    const { wallIndex, n1Index, n2Index } = wallList.pop();

    if (!quickUnionFind.isConnected(n1Index, n2Index)) {
      path.push(wallIndex);
      quickUnionFind.connect(n1Index, n2Index);
      edgesCount += 1;
    }
  }

  path.reverse();
  return [...path];
};

export const generateUnconnectedNodes = () => {
  const possibleInitialConfiguration = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

  const startingPoint =
    possibleInitialConfiguration[Math.floor(Math.random() * 4)];

  let visited = new Set();
  let nodes = [getIndexFromXY(startingPoint)];
  let walls = new Set();
  let stack = [getIndexFromXY(startingPoint)];
  visited.add(getIndexFromXY(startingPoint));

  while (stack.length > 0) {
    const nIndex = stack.pop();
    const neighbors = getPathNeighbor(nIndex, 2);

    neighbors.forEach((neighbor) => {
      if (!visited.has(neighbor.n)) {
        stack.push(neighbor.n);
        visited.add(neighbor.n);
        nodes.push(neighbor.n);
      }

      walls.add({
        wallIndex: neighbor.w,
        n1Index: nIndex,
        n2Index: neighbor.n,
      });
    });
  }

  return { nodes, walls };
};
