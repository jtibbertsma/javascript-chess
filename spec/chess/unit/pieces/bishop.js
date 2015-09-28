describe("Chess.Pieces.Bishop", function () {

  beforeEach(function () {
    this.bishop = new Chess.Pieces.Bishop({ color: "white", pos: [0,0] });
  });

  it("inherits from SlidingPiece", function () {
    expect(this.bishop.parentClass).toEqual(Chess.Pieces.SlidingPiece);
  });
});