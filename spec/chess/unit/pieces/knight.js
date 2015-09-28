describe("Chess.Pieces.Knight", function () {

  beforeEach(function () {
    this.knight = new Chess.Pieces.Knight({ color: "white", pos: [3,4] });

    new Chess.Board({ pieces: [
      this.knight,
      new Chess.Pieces.Pawn({ pos: [1,3], color: "black" }),
      new Chess.Pieces.Pawn({ pos: [4,6], color: "white" }),
      new Chess.Pieces.Pawn({ pos: [5,5], color: "white" }),
    ]});
  });

  it("inherits from SteppingPiece", function () {
    expect(this.knight.parentClass).toEqual(Chess.Pieces.SteppingPiece);
  });

  describe(".validMoves", function () {

    it("moves like a Knight", function () {
      expect(Chess.Util.coordSort(this.knight.validMoves()))
        .toEqual(Chess.Util.coordSort([[1,3], [5,3], [4,2], [2,2], [1,5], [2,6]]));
    });
  });
});