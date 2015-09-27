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

  it("is not a pawn", function () {
    expect(this.piece.isPawn()).toEqual(false);
  });

  describe(".move", function () {

    it("sets the position of the piece", function () {
      this.piece.move([7,7]);
      expect(this.piece.pos).toEqual([7,7]);
    });
  });

  describe(".unMove", function () {

    it("is defined", function () {
      expect(this.piece.unMove).toBeDefined();
    });
  });

  describe(".moved", function () {

    beforeEach(function () {
      this.mover = new Mocks.Mover(this.piece);
    });

    it("returns true if a piece has been moved", function () {
      this.mover.move();
      expect(this.piece.moved()).toBeTruthy();
    });

    it("otherwise false", function () {
      expect(this.piece.moved()).toBeFalsy();
    });

    it("also returns false if a move is undone", function () {
      for (var i = 0; i < 25; ++i) {
        this.mover.move();
        this.mover.unMove();
      }

      expect(this.piece.moved()).toBeTruthy();
    });
  });
});