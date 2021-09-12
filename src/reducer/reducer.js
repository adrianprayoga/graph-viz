import {
  RUNNING,
  SET_ALGO,
  SET_ALGO_STATUS,
  SET_MAZE_GEN,
  SET_MAZE_GEN_STATUS,
  SET_STEP,
} from "./actions";

export const algoReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALGO:
      const newState = { ...state, algo: action.payload };
      return newState;
    case SET_STEP:
      return { ...state, step: action.payload };
    case SET_ALGO_STATUS:
      return { ...state, status: action.payload };
    case SET_MAZE_GEN:
      return { ...state, maze_gen: action.payload };
    case SET_MAZE_GEN_STATUS:
      return { ...state, maze_gen_status: action.payload };
    default:
      return state;
  }
};
