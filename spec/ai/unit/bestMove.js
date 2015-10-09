describe("The main AI logic", function () {

  describe("AI.bestMove", function () {
    function validPos(pos) {
      return pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8;
    }

    beforeEach(function () {
      this.ai = new AI.ChessAI("white");
      this.game = new Chess.Game({ board: new Chess.Board({ pieces: Chess.Util.defaultPieces() })});
    });

    // it("returns an array of two coordinates", function () {
    //   var res = this.ai.bestMove(this.game);

    //   expect(res.length).toEqual(2);
    //   expect(validPos(res[0])).toBeTruthy();
    //   expect(validPos(res[1])).toBeTruthy();
    // });

    it("passes an array of two coordinates into the callback", function (done) {
      this.ai.bestMove(this.game, function (move) {
        expect(move.length).toEqual(2);
        expect(validPos(move[0])).toBeTruthy();
        expect(validPos(move[1])).toBeTruthy();
        done();
      });
    }, 100000);

    it("calculates a valid move", function (done) {
      var game = this.game;
      this.ai.bestMove(game, function (move) {
        expect(game.validMove(move[0], move[1])).toBeTruthy();
        done();
      });
    }, 100000);
  });
});