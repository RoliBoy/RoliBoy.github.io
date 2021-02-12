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


let noiseScale;
let flowField;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('canvas')

  blendMode(ADD)
  noFill()
  stroke(255, 121, 198, 3)
 
  noiseScale = 6 / width;
  flowField = Array(floor(256 * (width / height)**2)).fill().map(_ => {return {x: random(0, width), y: random(0, height)}})
}

function draw() {
  if (window.pageYOffset > height) return
  let angleMod = noise(frameCount *  0.000025) * TWO_PI

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
    // console.log(frameRate())
    if (frameRate() < 50) {
      flowField.splice(0, flowField.length / 2)
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}