describe("GameData", function () {

  beforeEach(function () {
    this.emptyData = new Chess.GameData();
  });

  it("should have a moves array", function () {
    expect(this.emptyData.moves).toBeDefined();
  });

  it("should have an array of captured black pieces", function () {
    expect(this.emptyData.capturedBlacks).toBeDefined();
  });

  it("should have an array of captured white pieces", function () {
    expect(this.emptyData.capturedWhites.moves).toBeDefined();
  });

  describe("Moving pieces", function () {

    beforeEach(function () {
      var mockBoard = {
        move: function (pos1, pos2) {
          if (mockBoard.pieces[pos1] === null) {
            mockBoard.pieces[pos1] = mockBoard.deleted;
            mockBoard.deleted = null;
          } else {
            mockBoard.deleted = mockBoard.pieces[pos1];
            mockBoard.pieces[pos1] = null;
          }
        },

        pieceAt: function (pos) {
          return mockBoard.pieces[pos];
        },

        placePiece: function (pos, piece) {
          mockBoard.pieces[pos] = piece;
        },

        inCheck: function (color) {
          return color === "white" && mockBoard.pieceAt([1,3]) === null;
        },

        deleted: null
      };

      mockBoard.pieces[[0,0]] = {
        color: "white",
        validMoves: function () {
          return [[0,0], [1,1], [2,2], [3,3], [4,4]];
        }
      };
      mockBoard.pieces[[1,3]] = {
        color: "white",
        validMoves: function () {
          return [[1,4]];
        }
      };
      mockBoard.pieces[[1,4]] = {
        color: "black"
      };

      spyOn(mockBoard, 'move');
      spyOn(mockBoard, 'inCheck');

      this.gameData = new Chess.GameData({
        board: mockBoard
      });
    });

    describe(".move", function () {

      it("moves a piece to a new position", function () {
        this.gameData.move([0,0], [2,2]);

        expect(this.gameData.board.move).toHaveBeenCalled();
        expect(this.gameData.board.inCheck).toHaveBeenCalled();
      });

      describe("Throws an exception for an invalid move:", function () {

        it("when the initial position is empty", function () {
          var f = function emptyMove() {
            this.gameData.move([9,9], [8,8]);
          }.bind(this);

          expect(f).toThrow();
        });

        it("when an out of bounds position is given", function () {
          var f1 = function outOfBoundsMove1() {
            this.gameData.move([-9,9], [8,8]);
          }.bind(this);

          var f2 = function outOfBoundsMove2() {
            this.gameData.move([0,0], [-1,0]);
          }.bind(this);

          var f3 = function outOfBoundsMove3() {
            this.gameData.move([0,0], [9,0]);
          }.bind(this);

          expect(f1).toThrow();
          expect(f2).toThrow();
          expect(f3).toThrow();
        });

        it("when the move isn't one of the piece's valid moves", function () {
          var f = function emptyMove() {
            this.gameData.move([0,0], [5,5]);
          }.bind(this);

          expect(f).toThrow();
        });

        it("when it leaves the mover in check", function () {
          var f = function emptyMove() {
            this.gameData.move([1,3], [1,4]);
          }.bind(this);

          expect(this.gameData.board.inCheck).toHaveBeenCalled();
          expect(f).toThrow();
        });
      });

      it("adds an item to the moves array", function () {
        var len = this.gameData.moves.length;

        this.gameData.move([0,0], [1,1]);
        expect(this.gameData.moves.length).toEqual(len + 1);
      });

      it("keeps track of captured pieces", function () {
        expect(this.gameData.capturedBlacks.length).toEqual(0);

        this.gameData.move([0,0], [4,4]);
        expect(this.gameData.capturedBlacks.length).toEqual(1);
      });
    });
  });
});