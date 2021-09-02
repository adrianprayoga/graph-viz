import React, { useState } from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import styled, { css } from "styled-components";
import { SOLUTION, START, TARGET, VISITED, WALL } from "./constants";

const DivBox = styled.div`
  background: transparent;
  border-radius: 0px;
  border: 0.5px solid lightblue;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: darkgray;
  ${({ type }) => {
    if (type === WALL) {
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
  }};
`;

const Box = ({ i, type, handleClick }) => {
  return (
    <DivBox type={type} onClick={(e) => handleClick(e)}>
      {type === START && (
        <PlayCircleFilledIcon color={"inherit"} fontSize={"inherit"} />
      )}
      {type === TARGET && (
        <TrackChangesIcon color={"inherit"} fontSize={"inherit"} />
      )}
    </DivBox>
  );
};

export default Box;
