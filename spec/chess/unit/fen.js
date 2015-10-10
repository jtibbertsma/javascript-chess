describe("FEN (Forsyth–Edwards Notation)", function () {

  describe("Piece Symbols", function () {

    describe("Pawn", function () {

      it("has the right symbol", function () {
        var white = new Chess.Pieces.Pawn({ color: "white", pos: [0, 0] }),
            black = new Chess.Pieces.Pawn({ color: "black", pos: [0, 0] });

        expect(white.symbol).toEqual('P');
        expect(black.symbol).toEqual('p');
      });
    });

    describe("King", function () {

      it("has the right symbol", function () {
        var white = new Chess.Pieces.King({ color: "white", pos: [0, 0] }),
            black = new Chess.Pieces.King({ color: "black", pos: [0, 0] });

        expect(white.symbol).toEqual('K');
        expect(black.symbol).toEqual('k');
      });
    });

    describe("Queen", function () {

      it("has the right symbol", function () {
        var white = new Chess.Pieces.Queen({ color: "white", pos: [0, 0] }),
            black = new Chess.Pieces.Queen({ color: "black", pos: [0, 0] });

        expect(white.symbol).toEqual('Q');
        expect(black.symbol).toEqual('q');
      });
    });

    describe("Bishop", function () {

      it("has the right symbol", function () {
        var white = new Chess.Pieces.Bishop({ color: "white", pos: [0, 0] }),
            black = new Chess.Pieces.Bishop({ color: "black", pos: [0, 0] });

        expect(white.symbol).toEqual('B');
        expect(black.symbol).toEqual('b');
      });
    });

    describe("Rook", function () {

      it("has the right symbol", function () {
        var white = new Chess.Pieces.Rook({ color: "white", pos: [0, 0] }),
            black = new Chess.Pieces.Rook({ color: "black", pos: [0, 0] });

        expect(white.symbol).toEqual('R');
        expect(black.symbol).toEqual('r');
      });
    });

    describe("Knight", function () {

      it("has the right symbol", function () {
        var white = new Chess.Pieces.Knight({ color: "white", pos: [0, 0] }),
            black = new Chess.Pieces.Knight({ color: "black", pos: [0, 0] });

        expect(white.symbol).toEqual('N');
        expect(black.symbol).toEqual('n');
      });
    });
  });

  describe("Board", function () {
    var board;

    beforeEach(function () {
      board = new Chess.Board({ pieces: Chess.Util.defaultPieces() });
    });

    it("gives the right string for the initial position", function () {
      expect(board.fen()).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    });

    it("gives correct strings for other positions", function () {
      board.move([6,4], [4,4]);
      expect(board.fen()).toEqual("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR");

      board.move([1,2], [3,2]);
      expect(board.fen()).toEqual("rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR");

      board.move([7,6], [5,5]);
      expect(board.fen()).toEqual("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R");
    });
  });

  xdescribe("Game", function () {

  });
});