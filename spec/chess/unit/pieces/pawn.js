describe("Chess.Pieces.Pawn", function () {

  beforeEach(function () {
    this.whitePawn = new Chess.Pieces.Pawn({ pos: [] })
    this.blackPawn = new Chess.Pieces.Pawn({ pos: [] })
  });

  it("inherits from Piece", function () {

  });

  it("is a pawn", function () {
    expect(this.whitePawn.isPawn()).toEqual(true);
  });

  describe(".validMoves", function () {

    describe("black", function () {

      it("can move one space forward", function () {

      });

      it("can move two spaces forward if it hasn't moved yet", function () {

      });

      it("can only move one space forward if it has moved", function () {

      });

      it("can capture a piece of the opposite color", function () {

      });

      it("can't move backwards", function () {

      });

      it("can't move forward diagonally to an empty square", function () {

      });

      it ("can't capture a piece of the same color", function () {

      });
    });

    describe("white", function () {

      it("can move one space forward", function () {

      });

      it("can move two spaces forward if it hasn't moved yet", function () {

      });

      it("can only move one space forward if it has moved", function () {

      });

      it("can capture a piece of the opposite color", function () {

      });

      it("can't move backwards", function () {

      });

      it("can't move forward diagonally to an empty square", function () {

      });

      it ("can't capture a piece of the same color", function () {

      });
    });
  });
});