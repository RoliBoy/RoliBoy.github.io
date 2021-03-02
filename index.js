//TODO: make this dynamic
slideStates = [...document.getElementsByClassName('project-images')].reduce((o, k) => ({...o, [k.id]: 0}), {});
[...document.getElementsByClassName('project-images')].forEach(div => div.children[0].style.display = 'block');

function slidePrev(slideGroupName) {
  slideStates[slideGroupName]--
  let slides = [...document.getElementById(slideGroupName).children].filter(e => e.classList.contains("project-image"))
  if (slideStates[slideGroupName] < 0)
    slideStates[slideGroupName] = slides.length - 1
  for (let slide of slides)
    slide.style.display = 'none'
  slides[slideStates[slideGroupName]].style.display = 'block'
}

function slideNext(slideGroupName) {
  slideStates[slideGroupName]++
  let slides = [...document.getElementById(slideGroupName).children].filter(e => e.classList.contains("project-image"))
  if (slideStates[slideGroupName] >= slides.length)
    slideStates[slideGroupName] = 0
  for (let slide of slides)
    slide.style.display = 'none'
  slides[slideStates[slideGroupName]].style.display = 'block'
}

// var canvas = document.getElementById("canvas")
// var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });



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

// let noiseScale;
// let flowField;

// function setup() {
//   let canvas = createCanvas(windowWidth, windowHeight)
//   canvas.parent('canvas')

//   blendMode(ADD)
//   noFill()
//   stroke(255, 121, 198, 3)
 
//   noiseScale = 6 / width;
//   flowField = Array(floor(256 * (width / height)**2)).fill().map(_ => {return {x: random(0, width), y: random(0, height)}})
// }

// function draw() {
//   if (window.pageYOffset > height) return
//   let angleMod = noise(frameCount *  0.000025) * TWO_PI

//   for (let p of flowField) {
//     if (p.x < 0 || p.y < 0 || p.x > width || p.y > height) {
//       p.x = random(0, width)
//       p.y = random(0, height)
//     }

//     let lastx = p.x;
//     let lasty = p.y;
//     let noised = noise(p.x * noiseScale, p.y * noiseScale);

//     p.x += cos(noised * TWO_PI + angleMod) * 1
//     p.y += sin(noised * TWO_PI + angleMod) * 1

//     line(lastx, lasty, p.x, p.y)
//   }

//   if (frameCount % 60 == 0) {
//     // console.log(frameRate())
//     if (frameRate() < 50) {
//       flowField.splice(0, flowField.length / 2)
//     }
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight)
// }