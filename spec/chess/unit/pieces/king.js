describe("Chess.Pieces.King", function () {

  beforeEach(function () {
    this.king = new Chess.Pieces.King({ color: "white", pos: [0,0] });
  });

  it("inherits from SteppingPiece", function () {
    expect(this.king.parentClass).toEqual(Chess.Pieces.SteppingPiece);
  });

  it("is a king", function () {
    expect(this.king.isKing()).toEqual(true);
  });
});