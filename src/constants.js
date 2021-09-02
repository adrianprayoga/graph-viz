export const VW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
export const VH = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

console.log(VW, VH)

export const NUM_COL = Math.floor(VW / 32.5);
export const NUM_ROW = Math.floor(VH / 32.5) - 3;

console.log(NUM_COL, NUM_ROW)

export const WALL = 'wall'
export const START = 'start'
export const TARGET = 'target'
export const EMPTY = 'empty'
export const VISITED = 'visited'
export const SOLUTION = 'solution'