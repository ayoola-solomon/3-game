import styled, { css, keyframes } from "styled-components";
import { Text } from "rebass/styled-components";

import { color, fontFamily, fontWeight } from "utils/styles";

const cssRound = css`
  border-radius: 50%;
  color: ${color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

export const GameWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const GameHeader = styled.div`
  height: 60px;
  background-color: ${color.primary};
  color: ${color.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GameFooter = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
`;

export const GameRounds = styled.div`
  flex: 1;
  height: calc(100% - 70px);
  overflow-y: auto;
  padding: 0 8px;
`;

export const PlayerAvatar = styled.div`
  height: 40px;
  width: 40px;
  background-color: ${color.gray};
  ${cssRound}
`;

export const RoundValueWrapper = styled.div`
  margin: 0 16px;
  display: flex;
  flex-direction: column;
  ${({ align }) =>
    align === "right" &&
    `
        align-items: flex-end;
    `}
`;

export const RoundValue = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${color.primary};
  font-weight: ${fontWeight.bold};
  font-family: ${fontFamily.primary};
  ${cssRound}
  ${({ as }) =>
    as === "button" &&
    `
    cursor: pointer;
    border: none;
    margin-bottom: 0;
  `}
  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
    opacity: 0.5;
  `}
`;

export const GameRoundWrapper = styled.div`
  display: flex;
  align-items: baseline;
  padding: 16px 0;
  ${({ align }) =>
    align === "right" &&
    `
        flex-direction: row-reverse;
    `}
`;

export const GameRoundText = styled(Text)`
  min-width: 200px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${color.white};
  margin: 8px 0;
  box-shadow: -1px -1px 10px 0px rgba(0, 0, 0, 0.2);
`;

const blinker = keyframes`
  50% {
    opacity: 0;
  }
`;

export const GameMessage = styled(Text)`
  animation: ${blinker} 1s linear infinite;
  text-align: center;
  padding: 16px;
`;

export const GameStatusWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  color: ${color.white};
  font-size: 3rem;
  font-weight: ${fontWeight.bold};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  background: ${color.primary};
  z-index: 1;
`;

export const GameStatusButton = styled.button`
  background: ${color.white};
  border: 2px solid transparent;
  color: ${color.primary};
  font-size: 1rem;
  font-weight: ${fontWeight.bold};
  padding: 20px 64px;
  border-radius: 35px;
  outline: none;
  &:hover,
  &:focus {
    border-color: ${color.primary};
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;
