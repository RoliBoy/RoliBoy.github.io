let objects = []

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('canvas')
  
  objects = new Array(32).fill().map(e => {
    return {
      x: random(width),
      y: random(height),
      r: random(TWO_PI),
      dx: random(-0.0001, 0.0001) * width,
      dy: random(-0.0001, 0.0001) * height,
      dr: random(-0.001, 0.001) * PI,
      c: random([color(255, 121, 198), color(189, 147, 249)]),
      s: random([max(width, height) * 0.015, max(width, height) * 0.01, max(width, height) * 0.0095]),
      t: random(['square', 'triangle'])
    }
  })
  
  strokeWeight(2)
  strokeJoin(ROUND);
  rectMode(RADIUS)
  noFill()
}

function draw() {
  clear()
  objects.forEach(o => {
    o.x += o.dx
    o.y += o.dy
    o.r += o.dr
    if (o.x < -o.s) o.x = width + o.s
    if (o.x > width + o.s) o.x = -o.s
    if (o.y < -o.s) o.y = height + o.s
    if (o.y > height) o.y = -o.s
    push()
    translate(o.x, o.y)
    rotate(o.r)
    o.c.setAlpha((1 - map(height - o.y - o.s, 0, height, 1, 0) ** 2) * 255)
    stroke(o.c)
    o.t == 'triangle'?
      triangle(0, -2/3 * o.s, -1/sqrt(3) * o.s, 1/3 * o.s, 1/sqrt(3) * o.s, 1/3 * o.s):
      rect(0, 0, o.s, o.s, o.s/2)
    pop()
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}