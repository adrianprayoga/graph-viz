import { RUNNING, SET_ALGO, SET_ALGO_STATUS, SET_STEP } from "./actions";

export const algoReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALGO:
      const newState = { ...state, algo: action.payload };
      return newState;
    case SET_STEP:
      return { ...state, step: action.payload };
    case SET_ALGO_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
