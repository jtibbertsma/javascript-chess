(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined"
      typeof Chess.Pieces.SteppingPiece === "undefined") {
    throw "missing dependency";
  }
})();