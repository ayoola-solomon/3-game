import React, { useEffect, useState } from "react";

import { useApp } from "context/app.context";
import { status } from "utils/status";
import { Rounds } from "./Game.Rounds";
import { GameStatus } from "./Game.Status";
import { RoundValue, GameWrapper, GameFooter, GameHeader } from "./Game.styles";

export const Game = () => {
  const {
    socket,
    currentGame,
    setCurrentGame,
    isGameStarted,
    setIsGameStarted,
  } = useApp();

  const [message, setMessage] = useState("");
  const [disableOptions, setDisableOptions] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    socket.on(status.WAITING_FOR_OPPONENT, (message) => {
      setMessage(message);
    });

    socket.on(status.CURRENT_GAME, (game) => {
      setCurrentGame(game);
    });

    socket.on(status.YOUR_ROUND, () => {
      setDisableOptions(false);
      setMessage("Your Round");
    });

    socket.on(status.WINNER, () => {
      setMessage("");
      setIsWinner(true);
    });

    socket.on(status.GAME_OVER, () => {
      setMessage("");
      setDisableOptions(true);
      setIsGameOver(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, setCurrentGame]);

  const onOptionClick = (value) => {
    socket.emit(status.ROUND, currentGame.id, value);
    setMessage("Waiting for the other player...");
    setDisableOptions(true);
  };

  const onNewGame = () => {
    setIsGameStarted(false);
    setIsGameOver(false);
    setIsWinner(false);
    setCurrentGame();
  };

  if (!isGameStarted) return null;

  return (
    <GameWrapper>
      <GameHeader>Scoober Team Win the Game or win the job</GameHeader>
      <Rounds
        rounds={currentGame?.rounds}
        playerId={socket.id}
        message={message}
      />
      {isGameOver || isWinner ? (
        <GameStatus status={isWinner ? "won" : "lose"} onClick={onNewGame} />
      ) : null}
      <GameFooter>
        {[-1, 0, +1].map((value, index) => (
          <RoundValue
            key={index}
            as="button"
            disabled={disableOptions}
            onClick={() => onOptionClick(value)}
          >
            {value}
          </RoundValue>
        ))}
      </GameFooter>
    </GameWrapper>
  );
};
