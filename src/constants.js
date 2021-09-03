export const VW = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
export const VH = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

const MIN_ROW = 10;
const MIN_COL = 20;

export const NUM_COL = Math.max(MIN_COL, Math.floor(VW / 32.5));
export const NUM_ROW = Math.max(MIN_ROW, Math.floor(VH / 32.5) - 3);

export const WALL = "wall";
export const START = "start";
export const TARGET = "target";
export const EMPTY = "empty";
export const TRAFFIC = "traffic";

export const NOT_VISITED = "not_visited"
export const VISITED_PREV = "visited_prev";
export const VISITED_CURR = "visited_curr";
export const SOLUTION = "solution";

export const BFS = 1
export const DJIKSTRA = 2
export const A_STAR = 3