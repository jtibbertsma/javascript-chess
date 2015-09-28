describe("Chess.Pieces.Queen", function () {

  beforeEach(function () {
    this.queen = new Chess.Pieces.Queen({ color: "white", pos: [0,0] });
  });

  it("inherits from SlidingPiece", function () {
    expect(this.queen.parentClass).toEqual(Chess.Pieces.SlidingPiece);
  });
});