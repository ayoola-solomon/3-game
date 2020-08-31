const gameStatus = require("../utils/game-status");

let games = [];

const remove = (gameId) => {
  games = games.filter((game) => game.id !== gameId);
  return games;
};

const save = (game) => {
  games.push(game);
  return game;
};

module.exports = {
  getAllActiveGames: () =>
    games.filter((game) => game.status !== gameStatus.PLAYING),
  remove,
  save,
  update: (game) => {
    remove(game.id);
    return save(game);
  },
  findGameById: (gameId) => games.find((game) => game.id === gameId),
  purge: () => {
    games = [];
    return games;
  },
};
