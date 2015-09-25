describe("Chess.Board", function () {
  
  beforeEach(function () {
    this.board = new Chess.Board({
      pieces: [{
        pos: [0,0],
        color: "white",
        id: "elephant"
      }, {
        pos: [0,1],
        color: "white"
      }, {
        pos: [0,2],
        color: "white"
      }, {
        pos: [2,0],
        color: "black"
      }, {
        pos: [3,2],
        color: "black",
        id: "orangutan"
      }
    ]});
  });

  describe("Getting pieces of a given color", function () {
    function searchForId(pieces, id) {
      for (var i = 0; i < pieces.length; ++i) {
        if (pieces[i].id && pieces[i].id === id) {
          return true;
        }
      }

      return false;
    }

    it(".blackPieces fetches all black pieces", function () {
      var pieces = this.board.blackPieces();

      expect(pieces.length).toEqual(2);
      expect(searchForId(pieces, "elephant")).toBeFalsy();
      expect(searchForId(pieces, "orangutan")).toBeTruthy();
    });

    it(".whitePieces fetches all white pieces", function () {
      var pieces = this.board.whitePieces();

      expect(pieces.length).toEqual(3);
      expect(searchForId(pieces, "elephant")).toBeTruthy();
      expect(searchForId(pieces, "orangutan")).toBeFalsy();
    });

    it(".piecesOfColor should be defined", function () {
      expect(this.board.piecesOfColor).toBeDefined();
    });
  });

  describe(".pieceAt", function () {

    it("sucessfully fetches pieces from the board", function () {
      expect(this.board.pieceAt([0,0]).id).toEqual("elephant");
      expect(this.board.pieceAt([3,2]).id).toEqual("orangutan");
    });
  });

  describe(".placePiece", function () {

    it("puts a piece in a new position", function () {
      var piece = { pos: [0,6], color: "black", id: "octopus" };
      this.board.placePiece([7,7], piece);

      expect(this.board.pieceAt([7,7]).id).toEqual("octopus");
      expect(this.board.blackPieces().length).toEqual(3);
    });

    it("sets the pos property of the moved piece", function () {
      var piece = { pos: [0,6], color: "black" };
      this.board.placePiece([7,7], piece);

      expect(piece.pos).toEqual([7,7]);
    });

    it("removes a placed piece if it's already on the board", function () {
      var piece = this.board.pieceAt([0,2]);
      this.board.placePiece([7,7], piece);

      expect(this.board.pieceAt([0,2])).toBeNull();
    });

    it("causes a captured piece to be removed from the board", function () {
      var piece = this.board.pieceAt([0,0]);
      this.board.placePiece([2,0], piece);

      expect(this.board.blackPieces().length).toEqual(1);
    });
  });

  describe(".move", function () {
    beforeEach(function () {
      spyOn(this.board, 'placePiece');
    });

    it("delegates to Board.placePiece", function () {
      this.board.move([0,2], [1,2]);
      expect(this.board.placePiece).toHaveBeenCalled();
    });

    it("shouldn't call placePiece if the initial position is null", function () {
      this.board.move([7,7], [0,6]);
      expect(this.board.placePiece).not.toHaveBeenCalled();
    });
  });
});