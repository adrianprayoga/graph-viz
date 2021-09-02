import React, { useState, useEffect, useMemo } from "react";
import Heapify from "heapify";
import "./App.css";
import Box from "./Box";
import styled from "styled-components";
import {
  EMPTY,
  NUM_COL,
  NUM_ROW,
  SOLUTION,
  START,
  TARGET,
  VISITED,
  WALL,
  VW,
} from "./constants";
import { djikstra } from "./algorithms";

const NUM_BOX = NUM_COL * NUM_ROW;
const START_NODE = Math.floor((NUM_COL * NUM_ROW) / 2) + 3;
const TARGET_NODE = Math.floor((NUM_COL * NUM_ROW) / 2 + 1) - 5;

const MazeRoot = styled.div`
  display: grid;
  grid-template-columns: repeat(${NUM_COL}, 1fr);
  gap: 0 0;
  width: ${VW - 100}px;
`;

const App = (props) => {
  const [nodeList, setNodeList] = useState({});
  const [startNode, setStartNode] = useState(START_NODE);
  const [targetNode, setTargetNode] = useState(TARGET_NODE);
  const [isSolving, setIsSolving] = useState(false);
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [onDrag, setOnDrag] = useState(false);

  const boxList = useMemo(() => {
    const boxList = [];
    for (let i = 0; i < NUM_BOX; i++) {
      boxList.push(i);
    }

    return boxList;
  }, []);

  useEffect(() => {
    const boxMap = {};

    for (let i = 0; i < NUM_BOX; i++) {
      boxMap[i] = {
        type: i === START_NODE ? START : i === TARGET_NODE ? TARGET : EMPTY,
      };
    }

    setNodeList(boxMap);
  }, [setNodeList]);

  const runAlgorithm = () => {
    setIsSolving(true);
    let distanceMap = { [startNode]: 0 };
    let pathMap = { [startNode]: undefined };
    let marked = new Set();
    let pq = new Heapify(NUM_COL * NUM_ROW);

    marked.add(startNode);
    pq.push(startNode, 0);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    let updatedNodeList = Object.keys(nodeList).reduce((accum, key) => {
      if (nodeList[key].type === SOLUTION || nodeList[key].type === VISITED) {
        accum[key] = {
          ...nodeList[key],
          type: EMPTY,
        };
      } else {
        accum[key] = { ...nodeList[key] };
      }

      return accum;
    }, {});

    const newIntervalId = setInterval(() => {
      const {
        solved: rSolved,
        inProgress: rInProgress,
        solution,
        interimObj,
      } = djikstra(
        updatedNodeList,
        startNode,
        targetNode,
        distanceMap,
        pathMap,
        marked,
        pq,
        10
      );

      if (rInProgress) {
        updatedNodeList = { ...solution };
        distanceMap = interimObj.distanceMap;
        pathMap = interimObj.pathMap;
        marked = interimObj.marked;
        pq = interimObj.pq;
      }

      (rSolved || rInProgress) && setNodeList(solution);

      if (rSolved === true || (rSolved === false && rInProgress === false)) {
        clearInterval(newIntervalId);
        setIntervalId(0);
        return;
      }
    }, 10);

    setIntervalId(newIntervalId);
  };

  const handleClick = (i) => (e) => {
    let nextType = EMPTY;
    switch (e.detail) {
      case 1:
        nextType = WALL;
        break;
      case 2:
        nextType = START;
        setStartNode(i);
        break;
      case 3:
        nextType = TARGET;
        setTargetNode(i);
        break;
      case 4:
        nextType = EMPTY;
        break;
      default:
        break;
    }

    setNodeList({
      ...nodeList,
      [i]: {
        ...nodeList[i],
        type: nextType,
      },
    });
  };

  return (
    <>
      <button onClick={runAlgorithm}> BUTTON </button>
      <MazeRoot>
        {boxList.map((index) => (
          <Box
            key={index}
            node={index}
            type={nodeList[index]?.type}
            handleClick={handleClick(index)}
          />
        ))}
      </MazeRoot>
    </>
  );
};

const getIdsOfNonEmptyNodes = (nodes) => {
  return Object.keys(nodes)
    .filter((key) => nodes[key].type !== EMPTY)
    .map((key) => ({ key, type: nodes[key].type }));
};

export default App;
