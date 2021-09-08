import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { DispatchContext, StateContext } from "../App";
import { SET_STEP } from "../reducer/actions";

const useStyles = makeStyles({
  root: {
    width: "90%",
  },
});

const marks = [2, 5, 10, 20, 40];

export default function AlgoSpeed() {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const handleChange = (event, newValue) => {
    if (newValue !== state.step) {
      dispatch({ type: SET_STEP, payload: newValue });
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict" gutterBottom>
        Speed
      </Typography>
      <Slider
        value={state.step}
        onChange={handleChange}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        max={40}
        marks={marks.map((mark) => ({ value: mark, label: mark }))}
      />
    </div>
  );
}
