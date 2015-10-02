describe("Chess.Pieces.Pawn", function () {

  beforeEach(function () {
    var pieces = [
      new Chess.Pieces.Pawn({ pos: [1,0], color: "black" }),
      new Chess.Pieces.Pawn({ pos: [0,0], color: "black" }),
      new Chess.Pieces.Pawn({ pos: [4,4], color: "black" }),
      new Chess.Pieces.Pawn({ pos: [2,6], color: "black" }),
      new Chess.Pieces.Pawn({ pos: [1,7], color: "black" }),
      new Chess.Pieces.Pawn({ pos: [4,5], color: "black" }),
      new Chess.Pieces.Pawn({ pos: [7,7], color: "white" }),
      new Chess.Pieces.Pawn({ pos: [1,1], color: "white" }),
      new Chess.Pieces.Pawn({ pos: [2,1], color: "white" }),
      new Chess.Pieces.Pawn({ pos: [6,5], color: "white" }),
      new Chess.Pieces.Pawn({ pos: [3,6], color: "white" }),
      new Chess.Pieces.Pawn({ pos: [3,0], color: "white" }),
      new Chess.Pieces.Pawn({ pos: [6,2], color: "white" })
    ];

    this.board = new Chess.Board({ pieces: pieces });

    this.board.move([0,0], [5,4]);
    this.board.move([7,7], [3,3])

    this.whitePawn = this.board.pieceAt([2,1]);
  });

  it("inherits from Piece", function () {
    expect(this.whitePawn.parentClass).toEqual(Chess.Pieces.Piece);
  });

  it("is a pawn", function () {
    expect(this.whitePawn.isPawn()).toEqual(true);
  });

  describe(".validMoves", function () {

    describe("black", function () {

      it("can move one space forward", function () {
        var piece = this.board.pieceAt([1,0]);
        expect(piece.validMoves()).toContain([2,0]);
      });

      it("can move two spaces forward if it hasn't moved yet", function () {
        var piece = this.board.pieceAt([1,7]);
        expect(piece.validMoves()).toContain([3,7]);
      });

      it("can only move one space forward if it has moved", function () {
        var piece = this.board.pieceAt([5,4]);
        expect(piece.validMoves()).not.toContain([7,4]);
      });

      it("can capture a piece of the opposite color", function () {
        var piece = this.board.pieceAt([1,0]);
        expect(piece.validMoves()).toContain([2,1]);
      });

      it("can't move backwards", function () {
        var piece = this.board.pieceAt([4,4]);
        expect(piece.validMoves()).not.toContain([3,4]);
      });

      it("can't capture backwards", function () {
        var piece = this.board.pieceAt([5,4]);
        expect(piece.validMoves()).not.toContain([3,3]);
      });

      it("can't move forward diagonally to an empty square", function () {
        var piece = this.board.pieceAt([4,4]);
        expect(piece.validMoves()).not.toContain([5,5]);
      });

      it("can't capture a piece of the same color", function () {
        var piece = this.board.pieceAt([1,7]);
        expect(piece.validMoves()).not.toContain([2,6]);
      });

      it("can't move forward if a piece of the same color is in the way", function () {
        var piece = this.board.pieceAt([4,4]);
        expect(piece.validMoves()).not.toContain([5,4]);
      });

      it("can't move forward if a piece of the opposite color is in the way", function () {
        var piece = this.board.pieceAt([2,6]);
        expect(piece.validMoves()).not.toContain([3,6]);
      });

      it("can't move two spaces forward if there's a piece in the way", function () {
        var piece = this.board.pieceAt([1,0]);
        expect(piece.validMoves()).not.toContain([3,0]);
      });
    });

    describe("white", function () {

      it("can move one space forward", function () {
        var piece = this.board.pieceAt([6,5]);
        expect(piece.validMoves()).toContain([5,5]);
      });

      it("can move two spaces forward if it hasn't moved yet", function () {
        var piece = this.board.pieceAt([6,2]);
        expect(piece.validMoves()).toContain([4,2]);
      });

      it("can only move one space forward if it has moved", function () {
        var piece = this.board.pieceAt([3,3]);
        expect(piece.validMoves()).not.toContain([1,3]);
      });

      it("can capture a piece of the opposite color", function () {
        var piece = this.board.pieceAt([2,1]);
        expect(piece.validMoves()).toContain([1,0]);
      });

      it("can't move backwards", function () {
        var piece = this.board.pieceAt([2,1]);
        expect(piece.validMoves()).not.toContain([3,1]);
      });

      it("can't capture backwards", function () {
        var piece = this.board.pieceAt([3,3]);
        expect(piece.validMoves()).not.toContain([5,4]);
      });

      it("can't move forward diagonally to an empty square", function () {
        var piece = this.board.pieceAt([3,3]);
        expect(piece.validMoves()).not.toContain([2,2]);
      });

      it("can't capture a piece of the same color", function () {
        var piece = this.board.pieceAt([6,5]);
        expect(piece.validMoves()).not.toContain([5,6]);
      });

      it("can't move forward if a piece of the same color is in the way", function () {
        var piece = this.board.pieceAt([2,1]);
        expect(piece.validMoves()).not.toContain([1,1]);
      });

      it("can't move forward if a piece of the opposite color is in the way", function () {
        var piece = this.board.pieceAt([3,6]);
        expect(piece.validMoves()).not.toContain([2,6]);
      });

      it("can't move two spaces forward if there's a piece in the way", function () {
        var piece = this.board.pieceAt([6,5]);
        expect(piece.validMoves()).not.toContain([4,5]);
      });
    });
  });
});