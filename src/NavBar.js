import React, { useContext } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { StateContext, DispatchContext } from "./App";
import AlgoSelection from "./components/AlgoSelection";
import { WALL } from "./constants";

const NavBar = (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <button onClick={props.onRunAlgoClick}> {`Run ${state.algo}`} </button>
        <AlgoSelection />
        <>
          <Typography>Wall Node</Typography>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
