import React, { useEffect, useRef } from "react";

import {
  GameRoundWrapper,
  PlayerAvatar,
  GameRoundText,
  RoundValue,
  RoundValueWrapper,
  GameRounds,
  GameMessage,
} from "./Game.styles";

export const Rounds = ({ rounds = [], playerId, message = "" }) => {
  const isMe = (round) => round.player.id === playerId;

  const messageRef = useRef();

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [rounds]);

  return (
    <GameRounds>
      {rounds.map((round, index) => (
        <GameRoundWrapper key={index} align={isMe(round) ? "left" : "right"}>
          <PlayerAvatar>{round.player.name[0]}</PlayerAvatar>
          <RoundValueWrapper align={isMe(round) ? "left" : "right"}>
            <RoundValue>{round.value}</RoundValue>
            <GameRoundText>{`[ (${round.value} + ${round.currentValue}) / 3 ] = ${round.nextValue}`}</GameRoundText>
            <GameRoundText>{round.nextValue}</GameRoundText>
          </RoundValueWrapper>
        </GameRoundWrapper>
      ))}
      <GameMessage ref={messageRef}>{message}</GameMessage>
    </GameRounds>
  );
};
