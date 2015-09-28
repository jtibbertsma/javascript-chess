describe("Chess.Pieces.Rook", function () {

  beforeEach(function () {
    this.rook = new Chess.Pieces.Rook({ color: "white", pos: [3,3] });

    new Chess.Board({ pieces: [
      this.rook,
      new Chess.Pieces.Pawn({ pos: [1,3], color: "white" }),
      new Chess.Pieces.Pawn({ pos: [3,1], color: "white" }),
      new Chess.Pieces.Pawn({ pos: [5,3], color: "black" }),
      new Chess.Pieces.Pawn({ pos: [3,7], color: "black" }),
    ]});
  });

  it("inherits from SlidingPiece", function () {
    expect(this.rook.parentClass).toEqual(Chess.Pieces.SlidingPiece);
  });

  describe(".validMoves", function () {

    it("moves like a Rook", function () {
      expect(Chess.Util.coordSort(this.rook.validMoves()))
        .toEqual(Chess.Util.coordSort([
          [3,2], [2,3], [3,4], [3,5], [3,6], [3,7], [4,3], [5,3]
        ]));
    });
  });
});