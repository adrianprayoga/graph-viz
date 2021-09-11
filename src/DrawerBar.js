import React, { useContext } from "react";
import {
  Drawer,
  makeStyles,
  List,
  ListItem,
  Divider,
  Button,
} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import { StateContext, DispatchContext } from "./App";
import { DRAWER_WIDTH } from "./constants";
import AlgoSelection from "./components/AlgoSelection";
import AlgoButton from "./components/AlgoButton";
import AlgoSpeed from "./components/AlgoSpeed";

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginRight: DRAWER_WIDTH,
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const DrawerBar = (props) => {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        color="secondary"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />

        <AlgoButton onRunAlgoClick={props.onRunAlgoClick} />
        <Divider />

        <List>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Algorithm Settings" />
          </ListItem>
          <ListItem>
            <AlgoSelection />
          </ListItem>
          <ListItem>
            <AlgoSpeed />
          </ListItem>
        </List>
        <Divider />

        <List>
          <ListItem>
            <Button
              variant="contained"
              onClick={props.handleClearNodes}
              color="primary"
              fullWidth
            >
              {`Clear Board`}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              onClick={props.handleAddRandomWallNodes}
              color="primary"
              fullWidth
            >
              {`Add Random Walls`}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              onClick={props.handleAddDfsWallNodes}
              color="primary"
              fullWidth
            >
              {`Add DFS Walls`}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              onClick={props.handleAddRandomTrafficNodes}
              color="primary"
              fullWidth
            >
              {`Add Random Traffic`}
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default DrawerBar;
