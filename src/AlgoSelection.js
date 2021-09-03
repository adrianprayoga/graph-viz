import React, { useContext } from "react";
import { StateContext, DispatchContext } from "./App";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { A_STAR, BFS, DJIKSTRA } from "./constants";
import { SET_ALGO } from "./reducer/actions";

const AlgoSelection = (props) => {
  // const [algo, setAlgo] = useState(DJIKSTRA);
  // const [state, dispatch] = useReducer(algoReducer, { algo: DJIKSTRA });

  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  return (
    <FormControl variant="outlined" width="100px">
      <InputLabel id="demo-simple-select-outlined-label">Algorithm</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={state.algo}
        onChange={(event) =>
          dispatch({ type: SET_ALGO, payload: event.target.value })
        }
        label="Algorithm"
      >
        <MenuItem value={BFS}>BFS</MenuItem>
        <MenuItem value={DJIKSTRA}>DJIKSTRA</MenuItem>
        <MenuItem value={A_STAR}>A*</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AlgoSelection;
