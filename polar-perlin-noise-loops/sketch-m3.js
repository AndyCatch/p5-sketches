// Lower the value = more perfect circle
let noiseMax = 0.1
let slider
let phase = 0

function setup() {
  createCanvas(600, 600)
  slider = createSlider(0.1, 20, 0, 0.1)
}

function draw() {
  background(0)

  translate(width / 2, height / 2)
  stroke(255)
  noFill()

  beginShape()
  noiseMax = slider.value()
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let xoff = map(cos(a), -1, 1, 0, noiseMax)
    let yoff = map(sin(a), -1, 1, 0, noiseMax)
    // Perlin noise always has a range between 0 & 1
    let r = map(noise(xoff, yoff), 0, 1, 100, 200)
    let x = r * cos(a)
    let y = r * sin(a)

    vertex(x, y)
  }
  endShape(CLOSE)
}
