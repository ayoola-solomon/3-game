const Game = require("../services/Game");
const pickRandom = require("./pickRandom");
const socketStatus = require("./socket-status");

const gameRound = (socket, io) => (round, game) => {
  io.to(game.owner.id).to(game.guest.id).emit(socketStatus.CURRENT_GAME, game);

  if (round) {
    if (round.nextValue === 1) {
      if (round.player.asComputer) {
        io.to(round.player.id).emit(socketStatus.WINNER);
        io.to(round.nextPlayer.id).emit(socketStatus.GAME_OVER);
      } else {
        io.to(socket.id).emit(socketStatus.WINNER);
        io.to(round.nextPlayer.id).emit(socketStatus.GAME_OVER);
      }

      Game.remove(game.id);
      io.emit(socketStatus.ACTIVE_GAMES, []);
    } else if (round.nextValue < 2) {
      io.to(socket.id).to(round.nextPlayer.id).emit(socketStatus.GAME_OVER);

      Game.remove(game.id);
      io.emit(socketStatus.ACTIVE_GAMES, []);
    } else {
      if (round.nextPlayer.asComputer) {
        const newRound = Game.round(
          round.nextPlayer.id,
          game,
          pickRandom([0, -1, 1])
        );

        // this will recursively continue the game
        gameRound(socket, io)(newRound, game);
      } else {
        io.to(round.nextPlayer.id).emit(socketStatus.YOUR_ROUND);
      }
    }
  } else {
    io.to(socket.id).emit(socketStatus.ERROR, "Could not process action.");
  }
};

module.exports = gameRound;
