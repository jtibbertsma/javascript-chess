describe("King Moves", function () {

  it("shows that a King won't move into check", function () {
    var game = new Chess.Game({
      board: new Chess.Board({
        pieces: [
          new Chess.Pieces.King({ pos: [5,4], color: "white" }),
          new Chess.Pieces.Knight({ pos: [5,7], color: "black" }),
          new Chess.Pieces.Rook({ pos: [4,7], color: "black" }),
          new Chess.Pieces.Bishop({ pos: [7,5], color: "black" }),
        ]
      })
    });

    expect(Chess.Util.coordSort(game.allValidMoves([5,4])))
      .toEqual(Chess.Util.coordSort([[5,5], [6,3]]));
  });
});