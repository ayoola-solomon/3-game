import React, { useState } from "react";

import { Label, Input, Checkbox } from "@rebass/forms";
import { Box, Button } from "rebass/styled-components";

import { useApp } from "context/app.context";
import { status } from "utils/status";
import {
  ExistingGames,
  ExistingGamesItem,
  HomeInnerWraper,
  HomeWrapper,
  StyledOR,
  Title,
  StyledButton,
} from "./Home.styles";

export const Home = () => {
  const { socket, games, isGameStarted, setIsGameStarted } = useApp();
  const [startValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [playWithComputer, setPlayWithComputer] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    socket.emit(status.NEW_GAME, name, startValue, playWithComputer);
    setIsGameStarted(true);
    setInputValue("");
  };

  const joinGame = (game) => {
    socket.emit(status.JOIN, game.id);
    setIsGameStarted(true);
  };

  const filteredGames = games.filter((game) => game.owner.id !== socket.id);

  if (isGameStarted) return null;

  const disableButton = !name || !startValue;

  return (
    <HomeWrapper>
      <HomeInnerWraper>
        <Title>The 3 Game</Title>
        <form onSubmit={onSubmit}>
          <Box my={3}>
            <Box my={2}>
              <Label htmlFor="name">Name</Label>
            </Box>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              placeholder="Please enter your name here"
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box my={3}>
            <Box my={2}>
              <Label htmlFor="startValue">Random Value</Label>
            </Box>
            <Input
              value={startValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="number"
              placeholder="Insert a random value"
            />
          </Box>
          <Box width={1} my={3}>
            <Label alignItems="center">
              <Checkbox
                id="withComputer"
                name="withComputer"
                onChange={(e) => setPlayWithComputer(e.target.checked)}
              />
              Play with Computer
            </Label>
          </Box>
          <Box width={1} my={3}>
            <StyledButton variant="primary" disabled={disableButton}>
              Start Game
            </StyledButton>
          </Box>
        </form>
        <StyledOR>OR</StyledOR>
        <Title>Join an existing game!</Title>
        <ExistingGames>
          {filteredGames.map((game) => (
            <ExistingGamesItem key={game.id}>
              <Button variant="secondary" onClick={() => joinGame(game)}>
                Join {game.owner.name}
              </Button>
            </ExistingGamesItem>
          ))}
        </ExistingGames>
      </HomeInnerWraper>
    </HomeWrapper>
  );
};
