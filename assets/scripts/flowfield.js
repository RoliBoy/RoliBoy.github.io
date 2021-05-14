let noiseScale;
let flowField;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('canvas')

  blendMode(ADD)
  noFill()
  stroke(255, 121, 198, 8)
 
  noiseScale = 8 / width;
  flowField = Array(floor(256 * (width / height)**2)).fill().map(_ => {return {x: random(0, width), y: random(0, height)}})
}

function draw() {
  if (window.pageYOffset > height) return
  let angleMod = noise(frameCount *  0.0001) * TWO_PI

  for (let p of flowField) {
    if (p.x < 0 || p.y < 0 || p.x > width || p.y > height) {
      p.x = random(0, width)
      p.y = random(0, height)
    }

    let lastx = p.x;
    let lasty = p.y;
    let noised = noise(p.x * noiseScale, p.y * noiseScale);

    p.x += cos(noised * TWO_PI + angleMod) * 1
    p.y += sin(noised * TWO_PI + angleMod) * 1

    line(lastx, lasty, p.x, p.y)
  }

  if (frameCount % 60 == 0) {
    if (frameRate() < 50) {
      flowField.splice(0, flowField.length / 2)
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}