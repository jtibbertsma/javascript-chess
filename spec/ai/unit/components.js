describe("AI utility type stuff", function () {

  describe("AI.value", function () {
    function color() {
      return Math.random() < 0.5 ? "white" : "black";
    }

    it("Gives the correct point values for each piece", function () {
      var pawn = new Chess.Pieces.Pawn({ color: color(), pos: [0,0]}),
          queen = new Chess.Pieces.Queen({ color: color(), pos: [0,0]})
          bishop = new Chess.Pieces.Bishop({ color: color(), pos: [0,0]})
          rook = new Chess.Pieces.Rook({ color: color(), pos: [0,0]})
          knight = new Chess.Pieces.Knight({ color: color(), pos: [0,0]});

      expect(AI.value(pawn)).toEqual(1);
      expect(AI.value(queen)).toEqual(10);
      expect(AI.value(bishop)).toEqual(3);
      expect(AI.value(rook)).toEqual(5);
      expect(AI.value(knight)).toEqual(3);
    });
  });

  describe("AI.metric", function () {

    it("Gives the largest possible value for checkmate", function () {
      var cgame = Mocks.checkmateGame;

      expect(Math.abs(AI.metric(cgame))).toBeGreaterThan(100);
      expect(Math.abs(AI.metric(cgame))).toBeGreaterThan(100);
    });
  });
});