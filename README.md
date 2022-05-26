# Grow-Shrink animation

Grow-Shrink animation - canvas, request animation frame, set interval.

## A really basic game development

### The drawing

Request animation frame is synchronized with screen refresh rate.

That is the perfect place to redraw the game.

Request animation frame is called right before the screen repaints.

Do the calculations outside and call the draw functions in the draw loop.

### The logic

The perfect place for logic is outside the draw loop.

A nice idea for the start is to create an object and add a draw method to it.

Add a behavior to the object.

Bind the behavior to the player keyboard or mouse events.

Make the behavior modify the object state.

### The result

Because the object has the state, it can be used in the draw loop.

The state update will reflect in the canvas.

### A tip

At some point you will need to use more complex mechanisms.

There are canvas libraries that are worth trying out.

## Code Explanation:

### Behavior explanation:

The `startLoop` function is recursive call. The `circle.draw` is called as many times as many hz as viewers monitor has.

The circle controls itself:

- sets initial size of 1/4 of canvas - radius is 1/8th but width is 2\*radius.
- positions itself in the center
- grows
- shrinks

The animation controls direction and calls circle draw or shrink.

### Implementation explanation:

The RAF's only responsibility is to draw.

The setInterval's only responsibility is to do the logic.

If I do the calculation logic in RAF I won't have consistency across different screens.

The 165hz screen will call the calculation logic 165 times per second.

The 60hz screen will call the calculation logic 60 times per second.

`setInterval` should approximately work the same across different browsers.

### The realistic approach.

In games, players are controlling the values.

Players are moving the characters.

Imagine the setInterval as a player.
