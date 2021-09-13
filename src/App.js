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
  DJIKSTRA,
  NOT_VISITED,
  SOLUTION,
  DFS,
  NUM_BOX,
  DFS_MAZE,
  RANDOM_MAZE,
  BINARY_MAZE,
  PRIMS_MAZE,
  KRUSKAL_MAZE,
} from "./constants";
import { algo } from "./algorithm/algorithms";
import DrawerBar from "./DrawerBar";
import {
  initializeNodes,
  resetNodeState,
  clearNodes,
  addRandomTrafficNodes,
  clearNode,
} from "./algorithm/nodesFunction";
import {
  RUNNING,
  SET_ALGO_STATUS,
  SET_MAZE_GEN_STATUS,
} from "./reducer/actions";
import { getIndexFromXY } from "./algorithm/helper";
import {
  generateBinaryMaze,
  generateDfsMaze,
  generateKruskalMaze,
  generatePrimsMaze,
  generateRandomMaze,
} from "./algorithm/mazeGeneration";

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
  width: 10px;
  align-content: center;
`;

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const App = () => {
  const [nodeList, setNodeList] = useState(
    initializeNodes(START_NODE, TARGET_NODE, NUM_BOX)
  );
  const [startNode, setStartNode] = useState(START_NODE);
  const [targetNode, setTargetNode] = useState(TARGET_NODE);
  const [dragging, setDragging] = useState({ val: false });
  const [intervalId, setIntervalId] = useState(0);
  const [solutionList, setSolutionList] = useState([]);
  const [wallList, setWallList] = useState([]);

  const [state, dispatch] = useReducer(algoReducer, {
    algo: DJIKSTRA,
    step: 10,
    maze_gen: DFS_MAZE,
    maze_gen_status: false,
  });

  const boxList = useMemo(() => {
    const boxList = [];
    for (let i = 0; i < NUM_BOX; i++) {
      boxList.push(i);
    }

    return boxList;
  }, []);

  const handleAddMaze = () => {
    if (!state.maze_gen_status) {
      dispatch({ type: SET_MAZE_GEN_STATUS, payload: true });
      let pathList = [];
      let inverse = false;
      if (state.maze_gen === DFS_MAZE) {
        pathList = generateDfsMaze(startNode, targetNode);
        inverse = true;
      } else if (state.maze_gen === RANDOM_MAZE) {
        pathList = generateRandomMaze(startNode, targetNode);
      } else if (state.maze_gen === BINARY_MAZE) {
        pathList = generateBinaryMaze(startNode, targetNode);
        inverse = true;
      } else if (state.maze_gen === PRIMS_MAZE) {
        pathList = generatePrimsMaze(startNode, targetNode);
        inverse = true;
      } else if (state.maze_gen === KRUSKAL_MAZE) {
        pathList = generateKruskalMaze(startNode, targetNode);
        inverse = true;
      }

      setNodeList((prevNodes) => clearNodes(prevNodes, inverse ? WALL : EMPTY));

      setWallList(pathList);
    } else {
      dispatch({ type: SET_MAZE_GEN_STATUS, payload: false });
    }
  };

  const handleClearNodes = () => {
    setNodeList((prevNodes) => clearNodes(prevNodes));
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

  // useEffect(() => {
  //   let tempSolList = [...solutionList];
  //   if (tempSolList.length !== 0) {
  //     const interval = setInterval(() => {
  //       setNodeList((prevNodeList) => {
  //         const sIndex = tempSolList.pop();
  //         prevNodeList[sIndex] = {
  //           ...prevNodeList[sIndex],
  //           state: SOLUTION,
  //         };

  //         return prevNodeList;
  //       });

  //       setSolutionList(tempSolList);

  //       if (tempSolList.length === 0) {
  //         clearInterval(interval);
  //       }
  //     }, TIME_INTERVAL);
  //     return () => clearInterval(interval);
  //   }
  // }, [solutionList]);

  useEffect(() => {
    let temp = [...solutionList];
    if (temp.length !== 0) {
      setNodeList((prevNodeList) => {
        let count = 0;
        while (temp.length > 0 && count < Math.min(state.step / 2, 5)) {
          const sIndex = temp.pop();
          prevNodeList[sIndex] = {
            ...prevNodeList[sIndex],
            state: SOLUTION,
          };
          count += 1;
        }

        return prevNodeList;
      });

      setSolutionList(temp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solutionList]);

  useEffect(() => {
    const inverse =
      [KRUSKAL_MAZE, DFS_MAZE, BINARY_MAZE, PRIMS_MAZE].indexOf(
        state.maze_gen
      ) !== -1;
    let temp = [...wallList];

    if (state.maze_gen_status) {
      if (temp.length !== 0) {
        setNodeList((prevNodeList) => {
          let count = 0;
          while (temp.length > 0 && count < state.step) {
            const sIndex = temp.pop();
            prevNodeList[sIndex] = clearNode(
              prevNodeList[sIndex],
              inverse ? EMPTY : WALL
            );
            count += 1;
          }

          return prevNodeList;
        });

        setWallList(temp);
      } else {
        dispatch({ type: SET_MAZE_GEN_STATUS, payload: false });
        setWallList([]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallList, state.maze_gen_status]);

  const handleClick = (i) => (e) => {
    const currentType = nodeList[i].type;
    let nextType = currentType;
    let nextState = nodeList[i].state;

    if (!dragging.val) {
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
      } else if (currentType === TARGET || currentType === START) {
        setDragging({ val: true, type: currentType });
      }
    } else {
      if (currentType !== WALL) {
        nextState = NOT_VISITED;
        nextType = dragging.type;
        if (dragging.type === TARGET) {
          setTargetNode(i);
        } else if (dragging.type === START) {
          setStartNode(i);
        }
      }

      setDragging({ val: false });
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

  const updateDraggedNode = (node) => {
    if (dragging.val && nodeList[node].type !== WALL) {
      const updateNode = dragging.type === START ? startNode : targetNode;
      setNodeList({
        ...nodeList,
        [node]: {
          ...nodeList[node],
          type: dragging.type,
          state: NOT_VISITED,
        },
        [updateNode]: {
          ...nodeList[updateNode],
          type: EMPTY,
          state: NOT_VISITED,
        },
      });

      if (dragging.type === TARGET) {
        setTargetNode(node);
      } else if (dragging.type === START) {
        setStartNode(node);
      }
    }
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div>
          <div style={{ display: "flex" }}>
            <MazeRoot>
              {boxList.map((index) => (
                <Box
                  key={index}
                  node={index}
                  type={nodeList[index]?.type}
                  state={nodeList[index]?.state}
                  handleClick={handleClick(index)}
                  updateDraggedNode={updateDraggedNode}
                />
              ))}
            </MazeRoot>
          </div>

          <DrawerBar
            onRunAlgoClick={runAlgorithm}
            handleClearNodes={handleClearNodes}
            handleAddRandomTrafficNodes={handleAddRandomTrafficNodes}
            handleAddMaze={handleAddMaze}
          />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
