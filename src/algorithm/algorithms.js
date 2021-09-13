import Heapify from "heapify";
import {
  A_STAR,
  DFS,
  DJIKSTRA,
  NUM_COL,
  NUM_ROW,
  TRAFFIC,
  VISITED_CURR,
  VISITED_PREV,
} from "../constants";
import { getNeighbor, getXYFromIndex } from "./helper";

const MAX_DIST = 99999999999;

export const algo = (
  nodes,
  startId,
  targetId,
  algoType = DJIKSTRA,
  steps = MAX_DIST,
  algoMemoryObj
) => {
  if (algoType === DFS) {
    return dfsAlgo(nodes, startId, targetId, algoType, steps, algoMemoryObj);
  } else {
    return bfsAlgo(nodes, startId, targetId, algoType, steps, algoMemoryObj);
  }
};

const dfsAlgo = (
  nodes,
  startId,
  targetId,
  algoType = DFS,
  steps = MAX_DIST,
  algoMemoryObj
) => {
  let pathMap = algoMemoryObj.pathMap || { [startId]: undefined };
  let marked = algoMemoryObj.marked || new Set();
  let lastVisited = algoMemoryObj.lastVisited || [];
  let deque = algoMemoryObj.deque || [startId];

  let count = 0;
  let copyNodes = { ...nodes };
  let currentlyVisited = [];

  while (deque.length > 0 && count < steps) {
    const nodeIndex = deque.pop();

    count += 1;

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

    if (!marked.has(nodeIndex)) {
      marked.add(nodeIndex);
      getNeighbor(copyNodes, nodeIndex)
        .filter((neighborId) => !marked.has(neighborId))
        .forEach((neighborId) => {
          pathMap[neighborId] = nodeIndex;
          deque.push(neighborId);
        });
    }
  }

  if (count === steps) {
    copyNodes = markAsVisitedPrev(lastVisited, copyNodes);

    return {
      solved: false,
      inProgress: true,
      solution: copyNodes,
      interimObj: {
        pathMap,
        marked,
        lastVisited: currentlyVisited,
        deque,
      },
    };
  }

  return { solved: false, inProgress: false, solution: copyNodes };
};

const bfsAlgo = (
  nodes,
  startId,
  targetId,
  algoType = DJIKSTRA,
  steps = MAX_DIST,
  algoMemoryObj
) => {
  let distanceMap = algoMemoryObj.distanceMap || { [startId]: 0 };
  let pathMap = algoMemoryObj.pathMap || { [startId]: undefined };
  let marked = algoMemoryObj.marked || new Set();
  let pq = algoMemoryObj.pq || new Heapify(NUM_COL * NUM_ROW);
  let lastVisited = algoMemoryObj.lastVisited || [];

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

/*
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
*/
