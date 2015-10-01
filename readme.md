# Chess Game

[Heroku Link](https://floating-woodland-1046.herokuapp.com/)

I want to write a chess AI in javascript.

## Goals

* Use inheritance to implement chess pieces
* Have a clever AI with multiple difficulties
  * Use a smarter metric than just assigning point values to pieces that can be captured
* Practice Angular, use it to simplify the view
* Maybe implement a backend to allow for saved games or multiplayer games

## Tests

Unit tests are implemented with Jasmine. Use ```npm test``` to run the test server, and navigate to localhost:8080 to see the results.

### Notes

* Unit test for individual pieces rely on the actual board object instead of a mock. Implementing a mock board for each case would be more difficult than it's worth

## Browser Issues

The chessboard UI is implemented by having png images of pieces positioned above the board div. Since the click handlers are registered on the board, we need a way to click 'through' the images to the board below. This is exactly what 'pointer-events: none;' accomplishes. Unfortunately, the pointer-events css property doesn't work on Opera or Internet Explorer.

In short, this app is completely broken on Opera and Internet Explorer.