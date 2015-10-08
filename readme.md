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

## AI Status

The first version of the AI is implemented. It uses a naive minimax algorithm. It has two massive drawbacks:

1. It's written synchronously.
2. It's *_slow_*. It takes about 10 seconds to make a move. And since it's synchronous, the page blocks for the entire time. This is not ideal.

So my goals for the near future are to rewrite the minimax algorithm asynchronously, and to figure out how to eliminate the redundencies in my chess calculations. I'd like to take this opportunity to learn how to profile javascript code. After that, I could research and implement other chess algorithms.

### Update

The AI is now asyncronous, but it's still quite slow. Also, in the angular logic, the piece images are bound to the piece data, so the pieces visibly move around on the board when the AI is doing trials.

To improve the speed of the AI, I need to cut down the massive redundencies in my chess logic. I'll try and come up with some sort of caching scheme.
