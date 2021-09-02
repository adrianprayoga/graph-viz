import Heapify from "heapify";
import { NUM_COL, NUM_ROW, SOLUTION, VISITED, WALL } from "./constants";

const MAX_DIST = 99999999999;

export const djikstra = (
  nodes,
  startId,
  targetId,
  distanceMap = { [startId]: 0 },
  pathMap = { [startId]: undefined },
  marked = new Set(),
  pq = new Heapify(NUM_COL * NUM_ROW),
  steps = MAX_DIST
) => {

  let count = 0;
  let copyNodes = { ...nodes };

  while (pq.size !== 0 && count < steps) {
    const nodeIndex = pq.pop();
    marked.add(nodeIndex);

    if (targetId === nodeIndex) {
      return {
        solved: true,
        inProgress: false,
        solution: getSolution(copyNodes, pathMap, startId, targetId),
      };
    } else if (nodeIndex !== startId) {
      copyNodes[nodeIndex].type = VISITED;
    }

    count += 1;

    const distanceToN = distanceMap[nodeIndex] || 0;
    getNeighbor(copyNodes, nodeIndex)
      .filter((neighborId) => !marked.has(neighborId))
      .filter(
        (neighborId) =>
          distanceToN + getDistanceToNeighbor() <
          getDistance(distanceMap, neighborId)
      )
      .forEach((neighborId) => {
        distanceMap[neighborId] = distanceToN + getDistanceToNeighbor();
        pathMap[neighborId] = nodeIndex;

        pq.push(
          neighborId,
          distanceToN + getDistanceToNeighbor() + getHeuristic()
        );
      });
  }

  if (count === steps) {
    return {
      solved: false,
      inProgress: true,
      solution: copyNodes,
      interimObj: { distanceMap, pathMap, marked, pq },
    };
  }

  return { solved: false, inProgress: false, solution: copyNodes };
};

// Ignore diagonal
const getNeighbor = (nodes, index) => {
  const { x, y } = getXYFromIndex(index);

  const neighbors = [
    { x: x + 1, y: y },
    { x: x - 1, y: y },
    { x: x, y: y + 1 },
    { x: x, y: y - 1 },
  ];

  return neighbors
    .filter((pos) => isValidLocation(pos, nodes))
    .map((pos) => getIndexFromXY(pos));
};

const getIndexFromXY = ({ x, y }) => {
  return y * NUM_COL + x;
};

const getXYFromIndex = (index) => {
  const y = Math.floor(index / NUM_COL);
  const x = index % NUM_COL;

  return { x, y };
};

const isValidLocation = ({ x, y }, nodes) => {
  const index = getIndexFromXY({ x, y });
  return (
    0 <= x && x < NUM_COL && 0 <= y && y < NUM_ROW && nodes[index].type !== WALL
  );
};

const getDistanceToNeighbor = () => {
  return 1;
};

const getHeuristic = () => {
  return 0;
};

const getDistance = (distMap, index) => {
  return distMap[index] === undefined ? MAX_DIST : distMap[index];
};

const getSolution = (nodes, pathMap, startId, targetId) => {
  let tmpNodes = { ...nodes };
  let tmp = pathMap[targetId];
  while (tmp && tmp !== startId) {
    tmpNodes[tmp] = { ...tmpNodes[tmp], type: SOLUTION };
    tmp = pathMap[tmp];
  }

  return tmpNodes;
};
