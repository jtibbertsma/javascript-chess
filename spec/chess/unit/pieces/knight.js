describe("Chess.Pieces.Knight", function () {

  beforeEach(function () {
    this.knight = new Chess.Pieces.Knight({ color: "white", pos: [0,0] });
  });

  it("inherits from SteppingPiece", function () {
    expect(this.knight.parentClass).toEqual(Chess.Pieces.SteppingPiece);
  });
});