describe("Chess.Pieces.Bishop", function () {

  beforeEach(function () {
    this.bishop = new Chess.Pieces.Bishop({ color: "white", pos: [1,2] });

    new Chess.Board({ pieces: [
      this.bishop,
      new Chess.Pieces.Pawn({ color: "white", pos: [2,1] }),
      new Chess.Pieces.Pawn({ color: "black", pos: [0,1] })
    ]});
  });

  it("inherits from SlidingPiece", function () {
    expect(this.bishop.parentClass).toEqual(Chess.Pieces.SlidingPiece);
  });

  describe(".validMoves", function () {

    it("moves like a Bishop", function () {
      expect(Chess.Util.coordSort(this.bishop.validMoves()))
        .toEqual(Chess.Util.coordSort([[0,3], [0,1], [2,3], [3,4], [4,5], [5,6], [6,7]]));
    });
  });
});