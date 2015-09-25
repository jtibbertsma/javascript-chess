describe("Fool's Checkmate", function () {

  it("game registers white checkmate for the fool's checkmate position", function () {
    var game = new Chess.Game({
      board: new Chess.Board({
        pieces: Chess.Util.defaultPieces()
      })
    });

    expect(game.checkmate()).toBeNull();

    game.move([6,6], [4,6]);
    game.move([1,4], [3,4]);
    game.move([6,5], [5,5]);
    game.move([0,3], [4,7]);

    expect(game.checkmate()).toEqual("white");
  });
});
