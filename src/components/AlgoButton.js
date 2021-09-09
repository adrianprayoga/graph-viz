import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import NavigationIcon from "@material-ui/icons/Navigation";
import { DispatchContext, StateContext } from "../App";
import { ALGO_NAME, A_STAR, BFS, DJIKSTRA } from "../constants";
import { SET_ALGO, RUNNING } from "../reducer/actions";

const algoList = [BFS, DJIKSTRA, A_STAR];

const AlgoButton = (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (algo) => {
    dispatch({ type: SET_ALGO, payload: algo });
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
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          color="primary"
          ref={anchorRef}
          aria-label="split button"
          style={{ width: "100%" }}
        >
          <Button
            onClick={props.onRunAlgoClick}
            startIcon={<NavigationIcon />}
            fullWidth
          >
            {`${state.status === RUNNING ? "Stop" : "Run"} ${
              ALGO_NAME[state.algo]
            }`}
          </Button>
          <Button
            color="primary"
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            fullWidth={false}
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
                    {algoList.map((option) => (
                      <MenuItem
                        key={option}
                        selected={state.algo === option}
                        onClick={() => handleMenuItemClick(option)}
                      >
                        {ALGO_NAME[option]}
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

export default AlgoButton;
