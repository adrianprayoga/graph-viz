import React, { useContext } from "react";
import {
  Drawer,
  makeStyles,
  List,
  ListItem,
  Divider,
  Button,
  Typography,
  Tooltip,
} from "@material-ui/core";
import "@fontsource/roboto";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import Box from "./components/Box";
import { StateContext, DispatchContext } from "./App";
import {
  DRAWER_WIDTH,
  SOLUTION,
  START,
  TARGET,
  TRAFFIC,
  VISITED_CURR,
  VISITED_PREV,
  WALL,
} from "./constants";
import AlgoButton from "./components/AlgoButton";
import AlgoSpeed from "./components/AlgoSpeed";
import RandomizeMazeButton from "./components/RandomizeMazeButton";
import { InfoOutlined, InfoRounded } from "@material-ui/icons";
import clsx from "clsx";

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
    background: "#EFEFEF",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  mainHeader: {
    background: "#393939",
  },
  headerLogo: {
    margin: "20px",
    display: "flex",
    color: "#EFEFEF",
    justifyContent: "center",
  },
  iconMargin: { alignSelf: "center", marginRight: "5px" },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  infoIcon: { alignSelf: "center", marginLeft: "5px" },
  listItemText: { display: "flex" },
}));

const DrawerBar = (props) => {
  const classes = useStyles();

  const infoList = [
    { primaryText: "Empty Node" },
    {
      primaryText: (
        <div className={classes.listItemText}>
          {"Wall Node"}
          <Tooltip title="Wall Node is impenetrable" arrow>
            <InfoOutlined fontSize="inherit" className={classes.infoIcon} />
          </Tooltip>
        </div>
      ),
      type: WALL,
    },
    {
      primaryText: (
        <div className={classes.listItemText}>
          {"Traffic Node"}
          <Tooltip title="Traffic Node costs 3x more to traverse" arrow>
            <InfoOutlined fontSize="inherit" className={classes.infoIcon} />
          </Tooltip>
        </div>
      ),
      type: TRAFFIC,
    },
    {
      primaryText: "Currently Node",
      state: VISITED_CURR,
    },
    {
      primaryText: "Visited Node",
      state: VISITED_PREV,
    },
    {
      primaryText: "Solution",
      state: SOLUTION,
    },
    { primaryText: "Start Node", type: START },
    { primaryText: "Target Node", type: TARGET },
  ];

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
        <div className={classes.mainHeader}>
          <Typography variant={"h4"} className={classes.headerLogo}>
            <BlurOnIcon fontSize="inherit" className={classes.iconMargin} />
            <b>Maze & Paths</b>
          </Typography>
        </div>

        <List>
          <ListItem>
            <RandomizeMazeButton onButtonClick={props.handleAddMaze} />
          </ListItem>
          <ListItem>
            <AlgoButton onButtonClick={props.onRunAlgoClick} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Algorithm Settings" />
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
              onClick={props.handleAddRandomTrafficNodes}
              color="primary"
              fullWidth
            >
              {`Add Random Traffic`}
            </Button>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <InfoRounded />
            </ListItemIcon>
            <ListItemText primary="Information" />
          </ListItem>
          <List dense>
            {infoList.map((item) => (
              <ListItem>
                <ListItemText primary={item.primaryText} />
                <Box
                  small
                  disabled={true}
                  type={item.type}
                  state={item.state}
                />
              </ListItem>
            ))}
          </List>
        </List>
      </Drawer>
    </>
  );
};

export default DrawerBar;
