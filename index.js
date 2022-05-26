// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Code Explanation:
//
// ----------------
// Behavior explanation:
//
// The startLoop function is recursive call. The circle.draw
// is called as many times as many hz as viewers monitor has.
//
// The circle controls itself:
//   - sets initial size of 1/4 of canvas - radius is 1/8th
//     but width is 2*radius
//   - positions itself in the center
//   - grows
//   - shrinks
//
// The animation controls direction and calls circle draw or
// shrink.
//
// ----------------
// Implementation explanation:
//
// The RAF's only responsibility is to draw.
// The setInterval's only responsibility is to do the logic.
//
// If I do the calculation logic in RAF I won't
// have consistency across different screens.
//
// The 165hz screen will call the calculation logic 165 times per second.
// The 60hz screen will call the calculation logic 60 times per second.
//
// setInterval should approximately work the same across different browsers.
//
// The realistic approach.
//
// In games, players are controlling the values.
// Players are moving the characters.
// Imagine the setInterval as a player.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// NOTE! I used es5 for cross browser compatibility

// returns array, first element is ours
var canvas = document.getElementsByTagName('canvas')[0];
// context in which i want to draw
var ctx = canvas.getContext('2d');

var circle = {
  radius: ~~(canvas.clientWidth / 8),
  // center
  x: canvas.clientHeight / 2,
  y: canvas.clientWidth / 2,
  draw: function () {
    ctx.beginPath();
    ctx.fillStyle = '#eae4e4';
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fill();
  },
  grow: function () {
    circle.radius += 1;
  },
  shrink: function () {
    circle.radius -= 1;
  },
};

// shrink-grow circle animation
var animation = {
  direction: 'grow',
  setDirection: function () {
    // division may result in decimals, use rounded values
    // to make sure conditionals do correct checks
    var isMaxSIze = circle.radius === canvas.clientHeight / 2;
    if (isMaxSIze) animation.direction = 'shrink';
    var isMinSize = circle.radius === ~~(canvas.clientWidth / 8);
    if (isMinSize) animation.direction = 'grow';
  },
  // grows the circle to the maximum size
  // then shrinks it to the initial size
  start: function () {
    setInterval(function () {
      animation.setDirection();
      if (animation.direction === 'grow') circle.grow();
      if (animation.direction === 'shrink') circle.shrink();
    }, 12.5);
  },
};

// starts the loop which clears the canvas then calls the draw callback
function startLoop(draw) {
  function refreshCanvas() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }

  // the drawing recursion
  // calls the draw function N times
  // N is the screen's refresh rate
  function loop() {
    refreshCanvas();
    draw();
    requestAnimationFrame(loop);
  }

  // start the loop
  requestAnimationFrame(loop);
}

startLoop(circle.draw);
animation.start();
