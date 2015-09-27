describe("Chess.Game", function () {

  beforeEach(function () {
    this.emptyGame = new Chess.Game();
  });

  it("should have a moves array", function () {
    expect(this.emptyGame.moves).toBeDefined();
  });

  it("should have an array of captured black pieces", function () {
    expect(this.emptyGame.capturedPieces.black).toBeDefined();
  });

  it("should have an array of captured white pieces", function () {
    expect(this.emptyGame.capturedPieces.white).toBeDefined();
  });

  describe("Moving pieces", function () {

    beforeEach(function () {
      var mockBoard = Mocks.generalBoard;
      mockBoard.__reset__();

      spyOn(mockBoard, 'move').and.callThrough();
      spyOn(mockBoard, 'pieceAt').and.callThrough();
      spyOn(mockBoard, 'placePiece').and.callThrough();

      this.game = new Chess.Game({
        board: mockBoard
      });
    });

    describe(".move", function () {

      it("moves a piece to a new position", function () {
        this.game.move([0,0], [2,2]);

        expect(this.game.board.move).toHaveBeenCalled();
        expect(this.game.board.pieceAt).toHaveBeenCalledWith([0,0]);
        expect(this.game.board.pieceAt).toHaveBeenCalledWith([2,2]);
      });

      describe("Throws an exception for an invalid move:", function () {

        it("when the initial position is empty", function () {
          var f = function emptyMove() {
            this.game.move([9,9], [8,8]);
          }.bind(this);

          expect(f).toThrow();
        });

        it("when an out of bounds position is given", function () {
          var f1 = function outOfBoundsMove1() {
            this.game.move([-9,9], [8,8]);
          }.bind(this);

          var f2 = function outOfBoundsMove2() {
            this.game.move([0,0], [-1,0]);
          }.bind(this);

          var f3 = function outOfBoundsMove3() {
            this.game.move([0,0], [8,0]);
          }.bind(this);

          expect(f1).toThrow();
          expect(f2).toThrow();
          expect(f3).toThrow();
        });

        it("when the move isn't one of the piece's valid moves", function () {
          var f = function illegalMove() {
            this.game.move([0,0], [5,5]);
          }.bind(this);

          expect(f).toThrow();
        });

        it("when it leaves the mover in check", function () {
          var f = function checkMove() {
            this.game.move([1,3], [1,4]);
          }.bind(this);

          expect(f).toThrow();
        });
      });

      it("shouldn't call allValidMoves", function () {
        // If we did call allValidMoves, we would be validating every square that
        // a piece could move to, which we don't want.
        spyOn(this.game, 'allValidMoves');

        this.game.move([0,0], [2,2]);
        expect(this.game.allValidMoves).not.toHaveBeenCalled();
      });

      it("adds an item to the moves array", function () {
        var len = this.game.moves.length;

        this.game.move([0,0], [1,1]);
        expect(this.game.moves.length).toEqual(len + 1);
      });

      it("keeps track of captured pieces", function () {
        expect(this.game.capturedPieces.black.length).toEqual(0);

        this.game.move([0,0], [4,4]);
        expect(this.game.capturedPieces.black.length).toEqual(1);
      });
    });

    
    describe(".undoLastMove", function () {
      beforeEach(function () {
        var capturedPiece = { color: "white" }
        this.piece = this.game.board.pieces['44'];

        this.game.moves.push({
          from: [5,6],
          to:   [4,4],
          capture: capturedPiece
        });

        this.game.capturedPieces.white.push(capturedPiece);
      });

      it("deletes the move from the moves array", function () {
        expect(this.game.moves.length).toEqual(1);
        this.game.undoLastMove();
        expect(this.game.moves.length).toEqual(0);
      });

      it("deletes a captured piece from the appropriate array", function () {
        expect(this.game.capturedPieces.white.length).toEqual(1);
        this.game.undoLastMove();
        expect(this.game.capturedPieces.white.length).toEqual(0);
      });

      it("returns a captured piece to its original position", function () {
        this.game.undoLastMove();
        expect(this.game.board.pieceAt([4,4])).toEqual({ color: "white" });
        expect(this.game.board.placePiece).toHaveBeenCalled();
      });

      it("moves the piece back to its original position", function () {
        expect(this.game.board.pieceAt([5,6])).toBeNull();
        this.game.undoLastMove();
        expect(this.game.board.pieceAt([5,6])).toEqual(this.piece);
      });

      it("calls unMove on the piece that is moved back", function () {
        spyOn(this.piece, 'unMove');

        this.game.undoLastMove();
        expect(this.piece.unMove).toHaveBeenCalled();
      });
    });
  });

  describe(".causesCheck", function () {
    beforeEach(function () {
      var MockBoard = Mocks.CausesCheckBoard;

      this.piece = Mocks.causesCheckPiece;
      this.game = new Chess.Game({
        board: new MockBoard(this.piece)
      });
    });

    it("returns true if a move will cause check", function () {
      expect(this.game.causesCheck(this.piece, [1,1])).toBeTruthy();
    });

    it("doesn't move the piece in question", function () {
      spyOn(this.game, 'undoLastMove');

      this.game.causesCheck(this.piece, [1,1]);
      expect(this.game.undoLastMove).toHaveBeenCalled();
      expect(this.game.board.inCheck()).toBeFalsy();
    });
  });

  describe(".allValidMoves", function () {

    beforeEach(function () {
      var mockBoard = Mocks.generalBoard;
      mockBoard.__reset__();

      spyOn(mockBoard, 'inCheck').and.callThrough();
      spyOn(mockBoard.pieces['00'], 'validMoves').and.callThrough();

      this.game = new Chess.Game({ board: mockBoard });
    });

    it("looks at the valid moves of the piece in the given position", function () {
      var allValidMoves = this.game.allValidMoves([0,0]);
      var piece = this.game.board.pieceAt([0,0]);

      expect(allValidMoves).toEqual([[1,1], [2,2], [3,3], [4,4]]);
      expect(piece.validMoves).toHaveBeenCalled();
    });

    it("returns an empty array for an empty or invalid square", function () {
      expect(this.game.allValidMoves([5,5])).toEqual([]);
      expect(this.game.allValidMoves([-1,-1])).toEqual([]);
    });

    it("checks if a move would leave the player in check", function () {
      var allValidMoves = this.game.allValidMoves([1,3]);

      expect(allValidMoves).toEqual([]);
      expect(this.game.board.inCheck).toHaveBeenCalledWith("white");
      expect(this.game.board.inCheck).not.toHaveBeenCalledWith("black");
    });

    it("only returns moves that get a player out of check", function () {
      this.game.board.move([1,3], [1,4]);
      var allValidMoves = this.game.allValidMoves([0,0]);

      expect(allValidMoves).toEqual([]);
    });
  });

  describe(".inCheck", function () {

    it("delegates to Board.inCheck", function () {
      this.emptyGame.board = { inCheck: function () {} };

      spyOn(this.emptyGame.board, 'inCheck');
      this.emptyGame.inCheck("white");

      expect(this.emptyGame.board.inCheck).toHaveBeenCalledWith("white");
      expect(this.emptyGame.board.inCheck).not.toHaveBeenCalledWith("black");

      this.emptyGame.inCheck("black");

      expect(this.emptyGame.board.inCheck).toHaveBeenCalledWith("black");
    });
  });

  describe(".movablePositions", function () {

    beforeEach(function () {
      var mockBoard = Mocks.generalBoard;
      mockBoard.__reset__();

      this.game = new Chess.Game({ board: mockBoard });
    });

    it("returns positions that have a piece with valid moves", function () {
      expect(this.game.movablePositions("white")).toEqual([[0,0]]);
    });

    it("returns an empty array if there are no possible moves", function () {
      this.game.board.move([1,3], [1,1]);

      expect(this.game.movablePositions("white")).toEqual([]);
    });
  });
});