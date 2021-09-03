import { SET_ALGO } from "./actions";

export const algoReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALGO:
      const newState = { ...state, algo: action.payload };
      return newState;
    default:
      return state;
  }
};
