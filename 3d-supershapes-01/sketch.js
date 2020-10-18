// From Super-Shiffman's 3D Supershape Playlist:
// https://www.youtube.com/playlist?list=PLRqwX-V7Uu6a5MvGn7a1y4dAKWzM8_Ar0

// v01 contains a "Make2DArray" function to make a JS Two-Dimensional Array

let cam // create a EasyCam Object

let globe // 2D Array to hold x,y,z
let total = 56 // Detail / Resolution of sphere
let offset = 0 // iterating this for color switch

let m = 0 // Supershape Constant
let mchange = 0 // Iterating for sine wave

let a = 1
let b = 1

let rainbow = false // Color switch

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  cam = createEasyCam()
  document.oncontextmenu = function () {
    return false
  }
  document.onmousedown = function () {
    return false
  }

  globe = make2DArray(total + 1, total + 1)
  // rows / columns, lat / long
  // We have to adjust the total+1 in this way to ensure that it goes back
  // to where it started not just at 'the end'

  colorMode(HSB)
}

//  Setting up supershape function with constants
function supershape(theta, m, n1, n2, n3) {
  let t1 = abs((1 / a) * cos((m * theta) / 4))
  t1 = pow(t1, n2)

  let t2 = abs((1 / b) * sin((m * theta) / 4))
  t2 = pow(t2, n3)

  let t3 = t1 + t2
  let r = pow(t3, -1 / n1)

  return r
}

function draw() {
  m = map(sin(mchange), -1, 1, 0, 7)
  mchange += 0.05

  background(51)
  noStroke()
  ambientLight(255)

  let r = 200 // Radius

  // Establish latitude-longitude values
  // & convert them into x, y, z
  for (let i = 0; i < total + 1; i++) {
    let lat = map(i, 0, total, -HALF_PI, HALF_PI)
    let r2 = supershape(lat, m, 0.2, 1.7, 1.7)

    for (let j = 0; j < total + 1; j++) {
      let lon = map(j, 0, total, -PI, PI)

      let r1 = supershape(lon, m, 0.2, 1.7, 1.7)

      let x = r * r1 * cos(lon) * r2 * cos(lat)
      let y = r * r1 * sin(lon) * r2 * cos(lat)
      let z = r * r2 * sin(lat)

      globe[i][j] = createVector(x, y, z)
    }
  }
  offset += 5

  for (let i = 0; i < total; i++) {
    toggleStripes(i, rainbow) // not 100% sure this is the best way to do this?
    beginShape(TRIANGLE_STRIP)
    for (let j = 0; j < total + 1; j++) {
      let v1 = globe[i][j]
      vertex(v1.x, v1.y, v1.z)
      let v2 = globe[i + 1][j]
      vertex(v2.x, v2.y, v2.z)
    }
    endShape()
  }
}

function toggleStripes(index, rainbow) {
  if (!rainbow) {
    blackAndWhite(index)
  } else {
    isRainbow(index)
  }
}

// Makes two tone stripe (effected by lighting)
function blackAndWhite(index) {
  if (index % 2 == 0) {
    fill(index * 15, 0, 0)
  } else {
    fill(index * 10 - 100)
  }
}

// Makes a rainbow
function isRainbow(index) {
  let hue = map(index, 0, total, 0, 255 * 6)
  fill((hue + offset) % 255, 255, 255)
}

// Switches colors
function keyPressed() {
  if (key == "1") {
    rainbow = !rainbow
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols)

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  return arr
}
