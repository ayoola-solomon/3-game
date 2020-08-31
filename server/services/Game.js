const Repository = require("./GameRepository");
const Game = require("../models/Game");

module.exports = {
  new: (name, value, owner, withComputer) => {
    const game = new Game(name, value, owner, withComputer);
    Repository.save(game);
    return game;
  },
  join: (gameId, guestId, name) => {
    const game = Repository.findGameById(gameId);
    if (!game) {
      throw new Error("Game not Found");
    }

    game.addGuest(guestId, name);
    Repository.update(game);

    return game;
  },
  list: () => Repository.getAllActiveGames(),
  round: (userId, game, value) => {
    const round = game.addRound(userId, value);
    Repository.update(game);
    return round;
  },
  remove: (gameId) => {
    const disconnectedGame = Repository.findGameById(gameId);
    const games = Repository.remove(gameId);

    return {
      games,
      disconnectedGame,
    };
  },
  get: (gameId) => Repository.findGameById(gameId),
  clearGames: () => {
    return Repository.purge();
  },
};
