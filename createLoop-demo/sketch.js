let angle = 0 // this variable will be used to change the angle of rotation

let gifLength = 360
let canvas

let gifOptions = {
  render: false,
  fileName: "createLoop-demo.gif",
  startLoop: 0,
  endLoop: 10,
}

function setup() {
  var p5Canvas = createCanvas(400, 400)
  canvas = p5Canvas.canvas

  rectMode(CENTER)
  noFill()
  strokeWeight(60)
  stroke(255)

  createLoop({ duration: 5, framesPerSecond: 60, gif: gifOptions })
}

function draw() {
  clear()
  background(20, 0, 0)
  let distributionFrequency = 0.001
  let rectSize = animLoop.noise1D(distributionFrequency + angle * 0.025) * 300

  // Translate to position our square
  translate(width / 2, height / 2)

  blendMode(OVERLAY)
  //we use our variables in the following functions
  // rotate(radians(angle))
  rotate(animLoop.theta * 0.05)
  rect(0, 0, rectSize, rectSize)
  ellipse(0, 0, rectSize, rectSize)

  //...updating our variable for our angle here
  angle += 0.005 // += is a shorthand version of strokeW = strokeW + 2;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    // I think I can alter the gif options object here to fire the render?
  }
}
