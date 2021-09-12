import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { DispatchContext, StateContext } from "../App";
import { SET_STEP } from "../reducer/actions";

const marks = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
  },
]
  .concat(Array.from({ length: 19 }, (_, i) => ({ value: (i + 1) * 5 })))
  .concat({
    value: 100,
    label: 100,
  });

const useStyles = makeStyles({
  root: {
    width: "90%",
  },
  slider: {
    marginLeft: "10px",
    marginRight: "10px",
  },
});

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
        min={1}
        max={100}
        marks={marks}
        className={classes.slider}
      />
    </div>
  );
}
