import React, { useState, useMemo, useReducer, useEffect } from "react";
import Heapify from "heapify";
import "./App.css";
import Box from "./components/Box";
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
  DRAWER_WIDTH,
  SOLUTION,
  DFS,
  NUM_BOX,
} from "./constants";
import { algo } from "./algorithm/algorithms";
import DrawerBar from "./DrawerBar";
import {
  initializeNodes,
  resetNodeState,
  clearNodes,
  addRandomWallNodes,
  addRandomTrafficNodes,
} from "./algorithm/nodesFunction";
import { RUNNING, SET_ALGO_STATUS } from "./reducer/actions";
import { getIndexFromXY } from "./algorithm/helper";
import { generateDfsMaze } from "./algorithm/mazeGeneration";

const TIME_INTERVAL = 1; // 1 mili
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
  const [nodeList, setNodeList] = useState(
    initializeNodes(START_NODE, TARGET_NODE, NUM_BOX)
  );
  const [startNode, setStartNode] = useState(START_NODE);
  const [targetNode, setTargetNode] = useState(TARGET_NODE);
  const [intervalId, setIntervalId] = useState(0);
  const [solutionList, setSolutionList] = useState([]);
  const [state, dispatch] = useReducer(algoReducer, {
    algo: DJIKSTRA,
    step: 20,
  });

  const boxList = useMemo(() => {
    const boxList = [];
    for (let i = 0; i < NUM_BOX; i++) {
      boxList.push(i);
    }

    return boxList;
  }, []);

  const handleAddDfsWallNodes = () => {
    // console.log(generateDfsMaze(startNode, targetNode))
    const path = generateDfsMaze(startNode, targetNode);
    const pathSet = new Set(path);

    setNodeList((prevNodes) => {
      let nodes = clearNodes(prevNodes);
      for (let i = 0; i < NUM_BOX; i++) {
        if (i !== START_NODE && i !== TARGET_NODE && !pathSet.has(i)) {
          nodes[i] = { ...nodes[i], state: NOT_VISITED, type: WALL };
        }
      }

      return nodes;
    });
  };

  const handleClearNodes = () => {
    setNodeList((prevNodes) => clearNodes(prevNodes));
  };

  const handleAddRandomWallNodes = () => {
    setNodeList((prevNodes) => addRandomWallNodes(prevNodes));
  };

  const handleAddRandomTrafficNodes = () => {
    setNodeList((prevNodes) => addRandomTrafficNodes(prevNodes));
  };

  const runAlgorithm = () => {
    setSolutionList([]);

    let distanceMap = { [startNode]: 0 };
    let pathMap = { [startNode]: undefined };
    let marked = new Set();
    let pq = new Heapify(NUM_COL * NUM_ROW);
    let lastVisited = [];
    let deque = [startNode];

    // marked.add(startNode);
    pq.push(startNode, 0);

    if (intervalId) {
      dispatch({ type: SET_ALGO_STATUS, payload: undefined });
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    dispatch({ type: SET_ALGO_STATUS, payload: RUNNING });
    let updatedNodeList = resetNodeState(nodeList);
    const newIntervalId = setInterval(() => {
      const algoMemoryObj =
        state.algo === DFS
          ? {
              pathMap,
              marked,
              lastVisited,
              deque,
            }
          : {
              distanceMap,
              pathMap,
              marked,
              pq,
              lastVisited,
            };

      const {
        solved: rSolved,
        inProgress: rInProgress,
        solution,
        solutionList,
        interimObj,
      } = algo(
        updatedNodeList,
        startNode,
        targetNode,
        state.algo,
        state.step,
        algoMemoryObj
      );

      if (rInProgress) {
        updatedNodeList = { ...solution };

        pathMap = interimObj.pathMap;
        marked = interimObj.marked;
        lastVisited = interimObj.lastVisited;

        if (state.algo !== DFS) {
          pq = interimObj.pq;
          distanceMap = interimObj.distanceMap;
        } else {
          deque = interimObj.deque;
        }
      }

      (rSolved || rInProgress) && setNodeList(solution);

      if (rSolved === true || (rSolved === false && rInProgress === false)) {
        dispatch({ type: SET_ALGO_STATUS, payload: undefined });
        clearInterval(newIntervalId);
        setIntervalId(0);
        if (solutionList) setSolutionList(solutionList);
        return;
      }
    }, TIME_INTERVAL);

    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    let tempSolList = [...solutionList];
    if (tempSolList.length !== 0) {
      const interval = setInterval(() => {
        if (tempSolList.length !== 0) {
          setNodeList((prevNodeList) => {
            const sIndex = tempSolList.pop();
            prevNodeList[sIndex] = {
              ...prevNodeList[sIndex],
              state: SOLUTION,
            };

            return prevNodeList;
          });

          setSolutionList(tempSolList);

          if (tempSolList.length === 0) {
            clearInterval(interval);
          }
        }
      }, TIME_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [solutionList]);

  useEffect(() => {
    let tempSolList = [...solutionList];
    if (tempSolList.length !== 0) {
      const interval = setInterval(() => {
        if (tempSolList.length !== 0) {
          setNodeList((prevNodeList) => {
            const sIndex = tempSolList.pop();
            prevNodeList[sIndex] = {
              ...prevNodeList[sIndex],
              state: SOLUTION,
            };

            return prevNodeList;
          });

          setSolutionList(tempSolList);

          if (tempSolList.length === 0) {
            clearInterval(interval);
          }
        }
      }, TIME_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [solutionList]);

  const handleClick = (i) => (e) => {
    let nextType, nextState;
    const currentType = nodeList[i].type;

    if (
      currentType !== TARGET &&
      currentType !== START &&
      currentType !== WALL
    ) {
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
          <DrawerBar
            onRunAlgoClick={runAlgorithm}
            handleClearNodes={handleClearNodes}
            handleAddRandomWallNodes={handleAddRandomWallNodes}
            handleAddRandomTrafficNodes={handleAddRandomTrafficNodes}
            handleAddDfsWallNodes={handleAddDfsWallNodes}
          />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
