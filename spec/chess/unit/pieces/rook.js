describe("Chess.Pieces.Rook", function () {

  beforeEach(function () {
    this.rook = new Chess.Pieces.Rook({ color: "white", pos: [0,0] });
  });

  it("inherits from SlidingPiece", function () {
    expect(this.rook.parentClass).toEqual(Chess.Pieces.SlidingPiece);
  });
});