const { nanoid } = require("nanoid");

const Player = require("./Player");
const gameStatus = require("../utils/game-status");

function getGameRound(value, player, currentValue, nextPlayer) {
  const prevResult = parseInt(currentValue, 10) + parseInt(value, 10);

  return {
    value: parseInt(value, 10),
    currentValue,
    prevResult,
    nextValue: Math.floor(prevResult / 3),
    player,
    nextPlayer,
  };
}

function Game(name, value, owner, asComputer) {
  this.value = parseInt(value, 10);
  this.currentValue = this.value;
  this.owner = new Player(name, owner);
  this.guest = asComputer ? new Player("guest", nanoid(), asComputer) : null;
  this.status = gameStatus.WAITING;
  this.rounds = [];
  this.id = nanoid();
}

Game.prototype.addGuest = function (guestId, name = "guest") {
  this.guest = new Player(name, guestId);
  this.status = gameStatus.PLAYING;
};

Game.prototype.addRound = function (userId, value) {
  const player = userId === this.owner.id ? this.owner : this.guest;
  const nextPlayer = userId === this.owner.id ? this.guest : this.owner;

  const round = getGameRound(value, player, this.currentValue, nextPlayer);

  this.status = gameStatus.PLAYING;
  this.currentValue = round.nextValue;
  this.rounds.push(round);

  return round;
};

module.exports = Game;
