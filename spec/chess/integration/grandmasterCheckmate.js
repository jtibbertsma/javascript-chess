describe("Grandmaster Checkmate", function () {

  // A more comprehensive integration test than fool's checkmate.
  // This requires castling to be implemented.

  it("shows that everything works properly", function () {
    var game = new Chess.Game({
      board: new Chess.Board({
        pieces: Chess.Util.defaultPieces()
      })
    });

    expect(game.checkmate()).toBeNull();

    game.move([6,4], [4,4]);
    game.move([1,4], [3,4]);
    game.move([7,6], [5,5]);
    game.move([0,1], [2,2]);
    game.move([7,5], [3,1]);
    game.move([0,6], [1,4]);
    game.move([6,2], [5,2]);
    game.move([1,3], [2,3]);
    game.move([6,3], [4,3]);
    game.move([0,2], [1,3]);
    game.move([7,4], [7,6]);
    game.move([1,4], [2,6]);
    game.move([5,5], [3,6]);
    game.move([1,7], [2,7]);
    game.move([3,6], [1,5]);
    game.move([0,4], [1,5]);
    game.move([3,1], [4,2]);

    expect(game.validMoves([2,2])).toEqual([]);
    expect(game.validMoves([1,3])).toEqual([[2,4]]);

    game.move([1,5], [1,4]);
    game.move([7,3], [3,7]);
    game.move([0,3], [0,4]);
    game.move([3,7], [3,6]);

    expect(game.validMoves([2,7])).toEqual([[3,6]]);

    game.move([2,7], [3,6]);
    game.move([7,2], [3,6]);

    expect(game.checkmate()).toEqual("black");
  });
});
