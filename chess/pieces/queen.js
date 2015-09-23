(function () {
  if (typeof Chess === "undefined" ||
      typeof Chess.Pieces === "undefined"
      typeof Chess.Pieces.SlidingPiece === "undefined") {
    throw "missing dependency";
  }
})();