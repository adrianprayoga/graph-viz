import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { DispatchContext, StateContext } from "../App";
import { WALL_GEN } from "../constants";
import {
  GENERATING_MAZE,
  SET_MAZE_GEN,
  SET_MAZE_GEN_STATUS,
} from "../reducer/actions";

const RandomizeMazeButton = (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (algo) => {
    dispatch({ type: SET_MAZE_GEN, payload: algo });
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ width: "100%" }}
    >
      <Grid item xs={12} style={{ width: "100%" }}>
        <ButtonGroup
          variant="contained"
          color="primary"
          ref={anchorRef}
          aria-label="split button"
          fullWidth
        >
          <Button
            onClick={props.onButtonClick}
            fullWidth
            startIcon={<AccountTreeIcon />}
          >
            {`${state.maze_gen_status ? "Stop" : "Create"} ${state.maze_gen}`}
          </Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            style={{ width: "15px" }}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          style={{ position: "relative", zIndex: 999 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {WALL_GEN.map((option) => (
                      <MenuItem
                        key={option}
                        selected={state.maze_gen === option}
                        onClick={() => handleMenuItemClick(option)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};

export default RandomizeMazeButton;
