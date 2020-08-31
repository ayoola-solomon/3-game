const Game = require("../../models/Game");
const GameRepository = require("../GameRepository");
const gameStatus = require("../../utils/game-status");

const testData = require("./testData.json");

describe("Game Repository Service", () => {
  afterEach((done) => {
    GameRepository.purge();
    done();
  });

  it("should save a game a return it", () => {
    const game = new Game(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );
    const saveGame = GameRepository.save(game);

    expect(saveGame.owner.name).toEqual(testData.game.name);
    expect(saveGame.owner.id).toEqual(testData.game.owner);
    expect(saveGame.owner.asComputer).toBeFalsy();

    expect(game.guest).toBeNull();
    expect(game.status).toEqual(gameStatus.WAITING);
    expect(game.rounds).toHaveLength(0);
  });

  it("should find game by id", () => {
    const game = new Game(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );
    GameRepository.save(game);
    const newGame = GameRepository.findGameById(game.id);

    expect(newGame).toBe(game);
  });

  it("should update game with new testData", () => {
    const game = new Game(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );
    GameRepository.save(game);

    game.addGuest(testData.guest.id, "Test");
    const updatedGame = GameRepository.update(game);

    expect(updatedGame).toBe(game);
  });

  it("should remove game from repository", () => {
    const game = new Game(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );
    GameRepository.save(game);
    GameRepository.remove(game.id);

    expect(GameRepository.findGameById(game.id)).toBeUndefined();
  });

  it("should return active games correctly", () => {
    const game = new Game(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );
    const game2 = new Game(
      testData.game.name,
      testData.game.value,
      testData.game.owner
    );

    GameRepository.save(game);
    GameRepository.save(game2);

    let games = GameRepository.getAllActiveGames();

    expect(games).toHaveLength(2);
    expect(games[0]).toEqual(game);

    game2.addGuest(testData.guest.id);

    games = GameRepository.getAllActiveGames();
    expect(games).toHaveLength(1);
  });
});
