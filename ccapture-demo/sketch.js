let angle = 0 // this variable will be used to change the angle of rotation
let gifLength = 360
let canvas

var capturer = new CCapture({
  framerate: 60,
  format: "gif",
  workersPath: "js/",
  verbose: true,
})

function setup() {
  var p5Canvas = createCanvas(400, 400)
  canvas = p5Canvas.canvas

  rectMode(CENTER)
  noFill()
  strokeWeight(60)
  stroke(255)

  // Uncomment this out to record a gif
  // capturer.start()
}

function draw() {
  background(0, 0, 33)

  var rectSize = sin(frameCount * 0.025) * 300

  // Translate to position our square
  translate(width / 2, height / 2)

  //we use our variables in the following functions
  rotate(radians(angle))
  rect(0, 0, rectSize, rectSize)
  ellipse(0, 0, rectSize, rectSize)

  //...updating our variable for our angle here
  angle += 0.35 // += is a shorthand version of strokeW = strokeW + 2;

  // Uncomment this out to record a gif
  // if (frameCount < gifLength) {
  //   capturer.capture(canvas)
  // } else if (frameCount === gifLength) {
  //   capturer.stop()
  //   capturer.save()
  // }
}
