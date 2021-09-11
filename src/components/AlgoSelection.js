import React, { useContext } from "react";
import { StateContext, DispatchContext } from "../App";
import { ButtonGroup, Button } from "@material-ui/core";
import { ALGO_NAME, A_STAR, BFS, DJIKSTRA, DFS } from "../constants";
import { SET_ALGO } from "../reducer/actions";

const AlgoSelection = (props) => {
  // const [algo, setAlgo] = useState(DJIKSTRA);
  // const [state, dispatch] = useReducer(algoReducer, { algo: DJIKSTRA });

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const algoList = [DFS, BFS, DJIKSTRA, A_STAR];

  return (
    <ButtonGroup
      fullWidth
      orientation="vertical"
      color="primary"
      variant="contained"
    >
      {algoList.map((algo) => (
        <Button
          key={algo}
          fullWidth={true}
          color={state.algo === algo ? "primary" : "inherit"}
          onClick={() => dispatch({ type: SET_ALGO, payload: algo })}
        >
          {ALGO_NAME[algo]}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default AlgoSelection;
