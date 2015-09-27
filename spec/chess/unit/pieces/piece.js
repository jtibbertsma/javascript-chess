describe("Chess.Pieces.Piece", function () {
  beforeEach(function () {
    this.piece = new Chess.Pieces.Piece({
      pos: [0,0],
      color: "white"
    });
  });

  it("is not a king", function () {
    expect(this.piece.isKing()).toEqual(false);
  });

  it("is not a rook", function () {
    expect(this.piece.isRook()).toEqual(false);
  });

  it("is not a pawn", function () {
    expect(this.piece.isPawn()).toEqual(false);
  });
});