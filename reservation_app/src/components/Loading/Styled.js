import styled, { keyframes } from "styled-components"

// Define variables
const size = "2"
const bgColor = "#838996"

// Define keyframes
const loadingSpin = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`

export const Loading = styled.div`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: 2em;
  height: 2em;
  background-color: transparent;
  border-radius: 100%;
  animation: ${loadingSpin} 1s infinite linear;

  &:after {
    content: "";
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    width: 110%;
    height: 110%;
    top: -5%;
    left: -5%;
    right: 0;
    bottom: 0;
    border: 5px solid transparent;
    border-radius: 100%;
    box-shadow: 0.08em  0.08em 0.08em ${bgColor};
  }
`

export const LoadingWrap = styled.div`
  box-sizing: border-box;
  display: table-cell;
  vertical-align: middle;
`
