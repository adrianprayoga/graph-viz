import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import TrafficIcon from "@material-ui/icons/Traffic";
import styled, { css } from "styled-components";
import {
  SOLUTION,
  START,
  TARGET,
  VISITED_PREV,
  VISITED_CURR,
  WALL,
  TRAFFIC,
} from "../constants";

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
    if (type === TRAFFIC) {
      return css`
        color: lightgray;
      `;
    } else if (type === WALL) {
      return css`
        background: black;
        -webkit-transition: background-color 1000ms linear;
        -ms-transition: background-color 1000ms linear;
        transition: background-color 1000ms linear;
      `;
    } else if (type === TARGET || type === START) {
      return css`
        background: transparent;
      `;
    }
  }};

  ${({ state }) => {
    if (state === VISITED_PREV) {
      return css`
        background-color: lightsteelblue;
        -webkit-transition: background-color 400ms linear;
        -ms-transition: background-color 400ms linear;
        transition: background-color 400ms linear;
      `;
    } else if (state === VISITED_CURR) {
      return css`
        background: steelblue;
      `;
    } else if (state === SOLUTION) {
      return css`
        background: lightseagreen;
        color: black;
      `;
    }
  }};
`;

const Box = ({ i, type, state, handleClick, handleDrag }) => {
  return (
    <DivBox
      type={type}
      state={state}
      onClick={(e) => handleClick(e)}
      draggable={type === TARGET || type === START}
    >
      {type === START && (
        <PlayCircleFilledIcon
          color={"inherit"}
          fontSize={"inherit"}
          background="inherit"
        />
      )}
      {type === TARGET && (
        <TrackChangesIcon
          color={"inherit"}
          fontSize={"inherit"}
          background="inherit"
        />
      )}
      {type === TRAFFIC && (
        <TrafficIcon
          color={"inherit"}
          fontSize={"inherit"}
          background="inherit"
        />
      )}
      {i}
    </DivBox>
  );
};

export default Box;
