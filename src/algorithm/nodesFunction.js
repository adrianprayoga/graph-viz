import { EMPTY, NOT_VISITED, START, TARGET, TRAFFIC, WALL } from "../constants";

export const initializeNodes = (START_NODE, TARGET_NODE, NUM_BOX) => {
  const boxMap = {};

  for (let i = 0; i < NUM_BOX; i++) {
    boxMap[i] = {
      type: i === START_NODE ? START : i === TARGET_NODE ? TARGET : EMPTY,
    };
  }

  return boxMap;
};

export const resetNodeState = (nodeList) => {
  return Object.keys(nodeList).reduce((accum, key) => {
    accum[key] = {
      ...nodeList[key],
      state: NOT_VISITED,
    };
    return accum;
  }, {});
};

export const addRandomWallNodes = (nodeList) => {
  const cleanNodes = clearNodes(nodeList);

  return Object.keys(cleanNodes).reduce((accum, key) => {
    const type = cleanNodes[key].type;
    if (Math.random() < 0.35 && type !== START && type !== TARGET) {
      accum[key] = {
        ...cleanNodes[key],
        type: WALL,
        state: NOT_VISITED,
      };
    } else {
      accum[key] = { ...cleanNodes[key] };
    }

    return accum;
  }, {});
};

export const addRandomTrafficNodes = (nodeList) => {
  return Object.keys(nodeList).reduce((accum, key) => {
    const type = nodeList[key].type;
    if (Math.random() < 0.2 && type === EMPTY) {
      accum[key] = {
        ...nodeList[key],
        type: TRAFFIC,
        state: NOT_VISITED,
      };
    } else {
      accum[key] = { ...nodeList[key] };
    }

    return accum;
  }, {});
};

export const clearNodes = (nodeList) => {
  return Object.keys(nodeList).reduce((accum, key) => {
    const type = nodeList[key].type;
    const nextType = type === START || type === TARGET ? type : EMPTY;
    accum[key] = {
      ...nodeList[key],
      state: NOT_VISITED,
      type: nextType,
    };
    return accum;
  }, {});
};
