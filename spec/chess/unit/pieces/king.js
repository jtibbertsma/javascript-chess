describe("Chess.Pieces.King", function () {

  beforeEach(function () {
    this.king = new Chess.Pieces.King({ color: "black", pos: [1,1] });

    new Chess.Board({ pieces: [
      this.king,
      new Chess.Pieces.Pawn({ color: "black", pos: [2,0] }),
      new Chess.Pieces.Pawn({ color: "white", pos: [2,1] }),
      new Chess.Pieces.Pawn({ color: "white", pos: [2,2] })
    ]});
  });

  it("inherits from SteppingPiece", function () {
    expect(this.king.parentClass).toEqual(Chess.Pieces.SteppingPiece);
  });

  it("is a king", function () {
    expect(this.king.isKing()).toEqual(true);
  });

  describe(".validMoves", function () {

    it("moves like a King", function () {
      expect(Chess.Util.coordSort(this.king.validMoves()))
        .toEqual(Chess.Util.coordSort([[2,1], [2,2], [1,2], [0,2], [0,1], [0,0], [1,0]]));
    });
  });
});