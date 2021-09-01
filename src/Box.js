import React, { useState } from "react";
import styled, { css } from "styled-components";
import { SOLUTION, START, TARGET, VISITED, WALL } from "./constants";

const DivBox = styled.div`
  background: transparent;
  border-radius: 0px;
  border: 0.5px solid lightblue;
  height: 30px;
  width: 30px;

  ${({ type }) => {
    if (type === START) {
      return css`
        background: blue;
      `;
    } else if (type === TARGET) {
      return css`
        background: lightgrey;
      `;
    } else if (type === WALL) {
      return css`
        background: black;
      `;
    } else if (type === VISITED) {
      return css`
        background: lightsteelblue;
      `;
    } else if (type === SOLUTION) {
      return css`
        background: orange;
      `;
    }
  }}
`;

const Box = ({ i, type, handleClick }) => {
  const [isStartNode, setIsStartNode] = useState(false);
  const [isEndNode, setIsEndNode] = useState(false);
  return <DivBox type={type} onClick={(e) => handleClick(e)} />;
};

export default Box;
