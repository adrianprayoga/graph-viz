import Heapify from "heapify";
import {
  A_STAR,
  DJIKSTRA,
  NUM_COL,
  NUM_ROW,
  SOLUTION,
  TRAFFIC,
  VISITED_CURR,
  VISITED_PREV,
  WALL,
} from "../constants";

const MAX_DIST = 99999999999;

export const bfsAlgo = (
  nodes,
  startId,
  targetId,
  distanceMap = { [startId]: 0 },
  pathMap = { [startId]: undefined },
  marked = new Set(),
  pq = new Heapify(NUM_COL * NUM_ROW),
  lastVisited = [],
  algoType = 2,
  steps = MAX_DIST
) => {
  let count = 0;
  let copyNodes = { ...nodes };
  let currentlyVisited = [];

  while (pq.size !== 0 && count < steps) {
    const nodeIndex = pq.pop();
    marked.add(nodeIndex);

    if (targetId === nodeIndex) {
      copyNodes = markAsVisitedPrev(
        lastVisited.concat(currentlyVisited),
        copyNodes
      );
      return {
        solved: true,
        inProgress: false,
        solution: copyNodes,
        solutionList: getSolutionList(pathMap, startId, targetId),
      };
    } else {
      currentlyVisited.push(nodeIndex);
      copyNodes[nodeIndex].state = VISITED_CURR;
    }

    count += 1;

    const distanceToN = distanceMap[nodeIndex] || 0;
    getNeighbor(copyNodes, nodeIndex)
      .filter((neighborId) => !marked.has(neighborId))
      .filter(
        (neighborId) =>
          distanceToN + getDistanceToNeighbor(algoType, nodes, neighborId) <
          getDistance(distanceMap, neighborId)
      )
      .forEach((neighborId) => {
        const distanceToNeighbor = getDistanceToNeighbor(
          algoType,
          nodes,
          neighborId
        );
        distanceMap[neighborId] = distanceToN + distanceToNeighbor;
        pathMap[neighborId] = nodeIndex;

        pq.push(
          neighborId,
          distanceToN +
            distanceToNeighbor +
            getHeuristic(algoType, neighborId, targetId)
        );
      });
  }

  if (count === steps) {
    copyNodes = markAsVisitedPrev(lastVisited, copyNodes);

    return {
      solved: false,
      inProgress: true,
      solution: copyNodes,
      interimObj: {
        distanceMap,
        pathMap,
        marked,
        pq,
        lastVisited: currentlyVisited,
      },
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

export const getIndexFromXY = ({ x, y }) => y * NUM_COL + x;

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

const getDistanceToNeighbor = (algoType, nodes, neighborId) => {
  if (algoType === A_STAR || algoType === DJIKSTRA) {
    return nodes[neighborId].type === TRAFFIC ? 3 : 1;
  }
  return 1;
};

const getHeuristic = (algoType, currentNode, targetNode) => {
  if (algoType === A_STAR) {
    const { x: x1, y: y1 } = getXYFromIndex(currentNode);
    const { x: x2, y: y2 } = getXYFromIndex(targetNode);

    return Math.floor(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2));
  }
  return 0;
};

const getDistance = (distMap, index) => {
  return distMap[index] === undefined ? MAX_DIST : distMap[index];
};

const getSolution = (nodes, pathMap, startId, targetId) => {
  let tmpNodes = { ...nodes };
  let tmp = pathMap[targetId];
  while (tmp && tmp !== startId) {
    tmpNodes[tmp] = { ...tmpNodes[tmp], state: SOLUTION };
    tmp = pathMap[tmp];
  }
  tmpNodes[startId] = { ...tmpNodes[startId], state: SOLUTION };
  tmpNodes[targetId] = { ...tmpNodes[targetId], state: SOLUTION };

  return tmpNodes;
};

const getSolutionList = (pathMap, startId, targetId) => {
  let ls = [targetId];
  let tmp = pathMap[targetId];
  while (tmp && tmp !== startId) {
    ls = ls.concat(tmp);
    tmp = pathMap[tmp];
  }
  ls = ls.concat(startId);

  return ls;
};

const markAsVisitedPrev = (lastVisited, nodes) => {
  let tempNodes = { ...nodes };
  for (const index of lastVisited) {
    tempNodes[index] = {
      ...tempNodes[index],
      state: VISITED_PREV,
    };
  }

  return tempNodes;
};
