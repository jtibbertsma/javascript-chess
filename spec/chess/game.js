describe("Chess.Game", function () {

  beforeEach(function () {
    this.emptyData = new Chess.Game();
  });

  it("should have a moves array", function () {
    expect(this.emptyData.moves).toBeDefined();
  });

  it("should have an array of captured black pieces", function () {
    expect(this.emptyData.capturedPieces.black).toBeDefined();
  });

  it("should have an array of captured white pieces", function () {
    expect(this.emptyData.capturedPieces.white).toBeDefined();
  });

  describe("Moving pieces", function () {

    beforeEach(function () {
      function stringify(pos) {
        return "" + pos[0] + pos[1];
      }

      var mockBoard = {
        move: function (pos1, pos2) {
          if (mockBoard.pieces[stringify(pos1)] === null) {
            mockBoard.pieces[stringify(pos1)] = mockBoard.deleted;
            mockBoard.deleted = null;
          } else {
            mockBoard.deleted = mockBoard.pieces[stringify(pos1)];
            mockBoard.pieces[stringify(pos1)] = null;
          }
        },

        pieceAt: function (pos) {
          return mockBoard.pieces[stringify(pos)];
        },

        placePiece: function (pos, piece) {
          mockBoard.pieces[stringify(pos)] = piece;
        },

        inCheck: function (color) {
          return color === "white" && mockBoard.pieceAt([1,3]) === null;
        },

        deleted: null,

        pieces: {
          00: {
            color: "white",
            validMoves: function () {
              return [[0,0], [1,1], [2,2], [3,3], [4,4]];
            }
          },
          13: {
            color: "white",
            validMoves: function () {
              return [[1,4]];
            }
          },
          44: {
            color: "black"
          },
          22: null,
          14: null,
          11: null,
          55: null
        }
      };

      spyOn(mockBoard, 'move').and.callThrough();
      spyOn(mockBoard, 'pieceAt').and.callThrough();
      spyOn(mockBoard, 'inCheck').and.callThrough();
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
            this.game.move([0,0], [9,0]);
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

          expect(this.game.board.inCheck).toHaveBeenCalledWith("white");
          expect(this.game.board.inCheck).not.toHaveBeenCalledWith("black");
          expect(f).toThrow();
        });
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
        expect(this.game.pieceAt([5,6])).toEqual({ color: "white" });
      });

      it("moves the piece back to its original position", function () {
        this.game.undoLastMove();
        expect(this.game.pieceAt([4,4])).toEqual({ color: "black" });
      });

      it("doesn't use Board.move", function () {
        this.game.undoLastMove();
        expect(this.game.board.placePiece).toHaveBeenCalled();
        expect(this.game.board.move).not.toHaveBeenCalled();
      });
    });
  });
});