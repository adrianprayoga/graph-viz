import { NUM_COL, NUM_ROW, WALL } from "../constants";

export const getXYFromIndex = (index) => {
  const y = Math.floor(index / NUM_COL);
  const x = index % NUM_COL;

  return { x, y };
};

export const isValidLocation = ({ x, y }, nodes, ignoreWall = false) => {
  const index = getIndexFromXY({ x, y });
  const indexIsWall = nodes[index]?.type !== WALL;

  return (
    0 <= x &&
    x < NUM_COL &&
    0 <= y &&
    y < NUM_ROW &&
    (ignoreWall || indexIsWall)
  );
};

export const getIndexFromXY = ({ x, y }) => y * NUM_COL + x;

// Ignore diagonal
export const getNeighbor = (nodes, index, step = 1, ignoreWall = false) => {
  const { x, y } = getXYFromIndex(index);

  const neighbors = [
    { x: x + step, y: y },
    { x: x - step, y: y },
    { x: x, y: y + step },
    { x: x, y: y - step },
  ];

  return neighbors
    .filter((pos) => isValidLocation(pos, nodes, ignoreWall))
    .map((pos) => getIndexFromXY(pos));
};

export const getPathNeighbor = (index, step = 2) => {
  const { x, y } = getXYFromIndex(index);

  const neighbors = [
    { x: x + step, y: y, xWall: x + 1, yWall: y },
    { x: x - step, y: y, xWall: x - 1, yWall: y },
    { x: x, y: y + step, xWall: x, yWall: y + 1 },
    { x: x, y: y - step, xWall: x, yWall: y - 1 },
  ];

  return neighbors
    .filter((pos) => isValidLocation(pos, {}, true))
    .map((pos) => ({
      n: getIndexFromXY(pos),
      w: getIndexFromXY({ x: pos.xWall, y: pos.yWall }),
    }));
};


export function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}