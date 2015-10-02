describe("Chess.Pieces.Queen", function () {

  beforeEach(function () {
    this.queen = new Chess.Pieces.Queen({ color: "white", pos: [3,1] });

    new Chess.Board({ pieces: [
      this.queen,
      new Chess.Pieces.Pawn({ color: "black", pos: [3,4] }),
      new Chess.Pieces.Pawn({ color: "white", pos: [5,1] })
    ]});
  });

  it("inherits from SlidingPiece", function () {
    expect(this.queen.parentClass).toEqual(Chess.Pieces.SlidingPiece);
  });

  describe(".validMoves", function () {

    it("moves like a Queen", function () {
      expect(Chess.Util.coordSort(this.queen.validMoves()))
        .toEqual(Chess.Util.coordSort([
          [2,1], [1,1], [0,1], [4,1], [3,0], [4,0], [2,0], [2,2],
          [1,3], [0,4], [4,2], [5,3], [6,4], [7,5], [3,2], [3,3], [3,4]
        ]));
    });
  });
});