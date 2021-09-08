import { SET_ALGO, SET_STEP } from "./actions";

export const algoReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALGO:
      const newState = { ...state, algo: action.payload };
      return newState;
    case SET_STEP:
      return { ...state, step: action.payload };
    default:
      return state;
  }
};
