const Game = require("../Game");
const gameStatus = require("../../utils/game-status");

const testData = require("./testData.json");

describe("Game Service", () => {
  afterEach((done) => {
    Game.clearGames();
    done();
  });

  it("should create a new game", () => {
    const game = Game.new(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );

    expect(game.value).toEqual(testData.game.value);
    expect(game.currentValue).toEqual(testData.game.value);

    expect(game.owner.name).toEqual(testData.game.name);
    expect(game.owner.id).toEqual(testData.game.owner);
    expect(game.owner.asComputer).toBeFalsy();

    expect(game.guest).toBeNull();
    expect(game.status).toEqual(gameStatus.WAITING);
    expect(game.rounds).toHaveLength(0);
  });

  it("should add guest to game", () => {
    const game = Game.new(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );
    Game.join(game.id, testData.guest.id);

    expect(game.guest.id).toEqual("2");
    expect(game.guest.name).toEqual("guest");
    expect(game.status).toEqual(gameStatus.PLAYING);

    expect(game.value).toEqual(testData.game.value);
    expect(game.currentValue).toEqual(testData.game.value);
  });

  it("should throw if game does not exist when adding guest to game", () => {
    expect(() => Game.join("12345", testData.guest.id)).toThrow();
  });

  it("should add round to game", () => {
    const game = Game.new(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );
    Game.join(game.id, testData.guest.id);

    const round = Game.round(testData.game.owner, game, -1);

    expect(round.value).toEqual(-1);

    expect(game.rounds).toHaveLength(1);
    expect(game.currentValue).toEqual(round.nextValue);
  });

  it("should get game by id", () => {
    const game = Game.new(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );
    expect(Game.get(game.id)).toEqual(game);
  });

  it("should return the list of all active games", () => {
    Game.new(testData.game.name, testData.game.value, testData.game.owner);
    Game.new(testData.game.name, testData.game.value, testData.game.owner);

    expect(Game.list()).toHaveLength(2);
  });
});
