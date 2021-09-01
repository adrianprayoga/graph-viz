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
  WALL,
} from "./constants";
import { djikstra } from "./algorithms";

const NUM_BOX = NUM_COL * NUM_ROW;
const START_NODE = 255;
const TARGET_NODE = 790;

const MazeRoot = styled.div`
  display: grid;
  grid-template-columns: repeat(50, 1fr);
  gap: 0 0;
  width: 1500px;
`;

const App = (props) => {
  const [nodeList, setNodeList] = useState({});
  const [startNode, setStartNode] = useState(START_NODE);
  const [targetNode, setTargetNode] = useState(TARGET_NODE);
  const [isSolving, setIsSolving] = useState(false);
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

    let updatedNodeList = Object.keys(nodeList).reduce((accum, key) => {
      if (nodeList[key].type === SOLUTION) {
        accum[key] = {
          ...nodeList[key],
          type: EMPTY,
        };
      } else {
        accum[key] = { ...nodeList[key] };
      }

      return accum;
    }, {});

    const { solved, inProgress, solution } = djikstra(
      updatedNodeList,
      startNode,
      targetNode,
      distanceMap,
      pathMap,
      marked,
      pq,
      200000
    );

    (solved || inProgress) && setNodeList(solution);
  };

  useEffect(() => {
    const handle = setInterval(() => {
      // Note useing the callback function, so `arr` isn't stale
      // in this callback
      // setArr(a => {
      //     if (a.length) {
      //         // Update the array, dropping the first entry
      //         return a.slice(1);
      //     }
      //     // No more entries, stop the timer
      //     clearInterval(handle);
      //     return a;
      // });

      setIsSolving(false);
    }, 500);
    return () => clearInterval(handle);
  }, [isSolving]);

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

export default App;
