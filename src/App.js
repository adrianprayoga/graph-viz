import React, { useState, useMemo, useReducer } from "react";
import Heapify from "heapify";
import "./App.css";
import Box from "./Box";
import NavBar from "./NavBar";
import { algoReducer } from "./reducer/reducer.js";
import styled from "styled-components";
import {
  EMPTY,
  NUM_COL,
  NUM_ROW,
  START,
  TARGET,
  WALL,
  VW,
  DJIKSTRA,
  NOT_VISITED,
  TRAFFIC,
  DRAWER_WIDTH,
} from "./constants";
import { bfsAlgo, getIndexFromXY } from "./algorithm/algorithms";
import DrawerBar from "./DrawerBar";
import { CssBaseline } from "@material-ui/core";

const STEPS = 20;
const TIME_INTERVAL = 1; // 1 mili
const NUM_BOX = NUM_COL * NUM_ROW;
const START_NODE = getIndexFromXY({
  x: Math.floor(NUM_COL / 2 - 8),
  y: Math.floor(NUM_ROW / 2),
});
const TARGET_NODE = getIndexFromXY({
  x: Math.floor(NUM_COL / 2 + 8),
  y: Math.floor(NUM_ROW / 2),
});

const MazeRoot = styled.div`
  display: grid;
  grid-template-columns: repeat(${NUM_COL}, 1fr);
  gap: 0 0;
  width: ${VW - DRAWER_WIDTH - 50}px;
`;

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const App = () => {
  const [nodeList, setNodeList] = useState(initializeNodes());
  const [startNode, setStartNode] = useState(START_NODE);
  const [targetNode, setTargetNode] = useState(TARGET_NODE);
  const [intervalId, setIntervalId] = useState(0);
  const [state, dispatch] = useReducer(algoReducer, { algo: DJIKSTRA });

  const boxList = useMemo(() => {
    const boxList = [];
    for (let i = 0; i < NUM_BOX; i++) {
      boxList.push(i);
    }

    return boxList;
  }, []);

  const runAlgorithm = () => {
    let distanceMap = { [startNode]: 0 };
    let pathMap = { [startNode]: undefined };
    let marked = new Set();
    let pq = new Heapify(NUM_COL * NUM_ROW);
    let lastVisited = [];

    marked.add(startNode);
    pq.push(startNode, 0);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    let updatedNodeList = resetNodeState(nodeList);
    const newIntervalId = setInterval(() => {
      const {
        solved: rSolved,
        inProgress: rInProgress,
        solution,
        interimObj,
      } = bfsAlgo(
        updatedNodeList,
        startNode,
        targetNode,
        distanceMap,
        pathMap,
        marked,
        pq,
        lastVisited,
        state.algo,
        STEPS
      );

      if (rInProgress) {
        updatedNodeList = { ...solution };
        distanceMap = interimObj.distanceMap;
        pathMap = interimObj.pathMap;
        marked = interimObj.marked;
        pq = interimObj.pq;
        lastVisited = interimObj.lastVisited;
      }

      (rSolved || rInProgress) && setNodeList(solution);

      if (rSolved === true || (rSolved === false && rInProgress === false)) {
        clearInterval(newIntervalId);
        setIntervalId(0);
        return;
      }
    }, TIME_INTERVAL);

    setIntervalId(newIntervalId);
  };

  const handleClick = (i) => (e) => {
    let nextType, nextState;
    const currentType = nodeList[i].type;

    if (currentType !== TARGET && currentType !== START) {
      nextType = WALL;
      nextState = NOT_VISITED;
    } else if (currentType === WALL) {
      nextType = EMPTY;
      nextState = NOT_VISITED;
    }

    nextType &&
      setNodeList({
        ...nodeList,
        [i]: {
          ...nodeList[i],
          type: nextType,
          state: nextState,
        },
      });
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div>
          <MazeRoot>
            {boxList.map((index) => (
              <Box
                key={index}
                node={index}
                type={nodeList[index]?.type}
                state={nodeList[index]?.state}
                handleClick={handleClick(index)}
              />
            ))}
          </MazeRoot>
          <DrawerBar onRunAlgoClick={runAlgorithm} />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;

const resetNodeState = (nodeList) => {
  return Object.keys(nodeList).reduce((accum, key) => {
    accum[key] = { ...nodeList[key], state: NOT_VISITED };
    return accum;
  }, {});
};

const initializeNodes = () => {
  const boxMap = {};

  for (let i = 0; i < NUM_BOX; i++) {
    boxMap[i] = {
      type:
        i === START_NODE
          ? START
          : i === TARGET_NODE
          ? TARGET
          : Math.random() < 0.2
          ? TRAFFIC
          : Math.random() < 0.1
          ? WALL
          : EMPTY,
    };
  }

  return boxMap;
};
