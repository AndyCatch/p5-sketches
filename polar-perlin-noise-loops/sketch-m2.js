function setup() {
  createCanvas(600, 600)
}

function draw() {
  background(0)

  translate(width / 2, height / 2)
  stroke(255)
  fill(255)

  // let t = 0 // t is a measure of 1D time passing

  beginShape()
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let xoff = cos(a)
    let yoff = sin(a)
    // Perlin noise always has a range between 0 & 1
    let r = map(noise(xoff, yoff), 0, 1, 100, 300)
    let x = r * cos(a)
    let y = r * sin(a)

    vertex(x, y)
    // t += 0.01
  }
  endShape(CLOSE)
  noLoop()
}
