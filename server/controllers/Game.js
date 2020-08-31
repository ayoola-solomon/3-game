const Game = require("../services/Game");
const gameRound = require("../utils/gameRound");
const pickRandom = require("../utils/pickRandom");
const socketStatus = require("../utils/socket-status");

module.exports = (server) => {
  const io = require("socket.io").listen(server);

  io.on("connection", (socket) => {
    io.emit(socketStatus.ACTIVE_GAMES, Game.list());

    socket.on(socketStatus.NEW_GAME, (name, startValue, withComputer) => {
      const game = Game.new(name, startValue, socket.id, withComputer);
      if (game) {
        if (withComputer) {
          Game.round(game.guest.id, game, pickRandom([0, -1, 1]));

          io.to(game.owner.id).emit(socketStatus.CURRENT_GAME, game);
          io.to(socket.id).emit(socketStatus.YOUR_ROUND);
        } else {
          io.to(socket.id).emit(
            socketStatus.WAITING_FOR_OPPONENT,
            "Waiting for opponent!"
          );
          io.emit(socketStatus.ACTIVE_GAMES, Game.list());
        }
      } else {
        io.to(socket.id).emit(socketStatus.ERROR, "Check your game data");
      }
    });

    socket.on(socketStatus.JOIN, (gameId, name) => {
      const game = Game.join(gameId, socket.id, name);
      if (game) {
        io.to(socket.id).emit(socketStatus.YOUR_ROUND);
        io.to(game.owner.id)
          .to(game.guest.id)
          .emit(socketStatus.CURRENT_GAME, game);
      } else {
        io.to(socket.id).emit(socketStatus.ERROR, "This game does not exist");
      }
      io.emit(socketStatus.ACTIVE_GAMES, Game.list());
    });

    socket.on(socketStatus.ROUND, (gameId, value) => {
      const game = Game.get(gameId);

      if (game) {
        const playerRound = Game.round(socket.id, game, value);

        gameRound(socket, io)(playerRound, game);
      } else {
        io.to(socket.id).emit(socketStatus.ERROR, "This game does not exist");
      }
    });

    socket.on(socketStatus.DISCONNECT, (gameId) => {
      const { games, disconnectedGame } = Game.remove(gameId);
      if (disconnectedGame) {
        io.to(disconnectedGame.owner.id)
          .to(disconnectedGame.guest.id)
          .emit(socketStatus.ERROR, "Opponent has disconnected");
      }

      io.emit(socketStatus.ACTIVE_GAMES, games);
    });
  });
};
