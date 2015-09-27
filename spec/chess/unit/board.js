describe("Chess.Board", function () {
  
  beforeEach(function () {
    this.board = new Chess.Board({
      pieces: [{
        pos: [0,0],
        color: "white",
        id: "elephant",
        isKing: function () { return false; }
      }, {
        pos: [0,1],
        color: "white",
        isKing: function () { return false; }
      }, {
        pos: [0,2],
        color: "white",
        isKing: function () { return false; },
        move: function (pos) { this.pos = pos; }
      }, {
        pos: [2,0],
        color: "black",
        isKing: function () { return false; }
      }, {
        pos: [3,2],
        color: "black",
        id: "orangutan",
        isKing: function () { return false; }
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

    it("successfully fetches pieces from the board", function () {
      expect(this.board.pieceAt([0,0]).id).toEqual("elephant");
      expect(this.board.pieceAt([3,2]).id).toEqual("orangutan");
    });

    it("returns null for an empty square", function () {
      expect(this.board.pieceAt([7,0])).toBeNull();
    });

    it("returns undefined for an invalid position", function () {
      expect(this.board.pieceAt([0,-1])).toBeUndefined();
    });
  });

  describe(".placePiece", function () {

    it("puts a piece in a new position", function () {
      var piece = { pos: [0,6], color: "black", id: "octopus" };
      this.board.placePiece([7,7], piece);

      expect(this.board.pieceAt([7,7]).id).toEqual("octopus");
      expect(this.board.blackPieces().length).toEqual(3);
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

    it("sets the pos property of the moved piece", function () {
      var piece = this.board.pieceAt([0,2]);

      this.board.move([0,2], [7,7]);
      expect(piece.pos).toEqual([7,7]);
    });

    it("should use Piece.move to move the piece", function () {
      var piece = this.board.pieceAt([0,2]);
      spyOn(piece, 'move');

      this.board.move([0,2], [7,7]);
      expect(piece.move).toHaveBeenCalledWith([7,7]);
    });
  });

  describe(".inCheck", function () {

    beforeEach(function () {
      this.checkBoard = new Chess.Board({ pieces: [
        {
          pos: [0,0],
          color: "white",
          validMoves: function () { return []; },
          isKing: function () { return true; }
        }, {
          pos: [0,1],
          color: "black",
          validMoves: function () { return [[0,0]]; },
          isKing: function () { return true; }
        }
      ]});
    });

    it("returns false when a player is not in check", function () {
      expect(this.checkBoard.inCheck("black")).toEqual(false);
    });

    it("returns true when a player is in check", function () {
      expect(this.checkBoard.inCheck("white")).toEqual(true);
    });
  });
});