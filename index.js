//TODO: make this dynamic
slideStates = {}
slideStates['slides-icarus'] = 0
slideStates['slides-archer'] = 0
// slideStates['slides-ansify'] = 0

function slidePrev(slideGroupClassName) {
    slideStates[slideGroupClassName]--
    let slides = document.getElementsByClassName(slideGroupClassName)
    if (slideStates[slideGroupClassName] < 0)
        slideStates[slideGroupClassName] = slides.length - 1
    for (let slide of slides)
        slide.style.display = 'none'
    slides[slideStates[slideGroupClassName]].style.display = 'block'
}

function slideNext(slideGroupClassName) {
    slideStates[slideGroupClassName]++
    let slides = document.getElementsByClassName(slideGroupClassName)
    if (slideStates[slideGroupClassName] >= slides.length)
        slideStates[slideGroupClassName] = 0
    for (let slide of slides)
        slide.style.display = 'none'
    slides[slideStates[slideGroupClassName]].style.display = 'block'
}

document.getElementsByClassName('slides-icarus')[0].style.display = 'block'
document.getElementsByClassName('slides-archer')[0].style.display = 'block'
// document.getElementsByClassName('slides-ansify')[0].style.display = 'block'



// var canvas = document.getElementById("canvas")
// var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });


// let camera, scene, stats, parameters;
// let mouseX = 0, mouseY = 0;

// let windowHalfX = window.innerWidth / 2;
// let windowHalfY = window.innerHeight / 2;

// const materials = [];

// init();
// animate();

// function init() {
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
//   camera.position.z = 1000;

//   scene = new THREE.Scene();
//   scene.fog = new THREE.FogExp2(0x544240, 0.0008);

//   const geometry = new THREE.BufferGeometry();
//   const vertices = [];

//   const textureLoader = new THREE.TextureLoader();

//   const sprite1 = textureLoader.load('images/covid.png');
//   const sprite2 = textureLoader.load('images/covid.png');
//   const sprite3 = textureLoader.load('images/covid.png');
//   const sprite4 = textureLoader.load('images/covid.png');
//   const sprite5 = textureLoader.load('images/covid.png');

//   for (let i = 0; i < 2000; i++) {
//     const x = Math.random() * 2000 - 1000;
//     const y = Math.random() * 2000 - 1000;
//     const z = Math.random() * 2000 - 1000;

//     vertices.push(x, y, z);
//   }

//   geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

//   parameters = [
//     [[1, 1, 1], sprite1, 20],
//     [[1, 1, 1], sprite1, 15],
//     [[1, 1, 1], sprite1, 10],
//     [[1, 1, 1], sprite1, 8],
//     [[1, 1, 1], sprite1, 5]
//   ];

//   for (let i = 0; i < parameters.length; i++) {

//     const color = parameters[i][0];
//     const sprite = parameters[i][1];
//     const size = parameters[i][2];

//     materials[i] = new THREE.PointsMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true });
//     // materials[i] = new THREE.PointsMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true });
//     // materials[i].color.setHSL(color[0], color[1], s[2]);

//     const particles = new THREE.Points(geometry, materials[i]);

//     particles.rotation.x = Math.random() * 6;
//     particles.rotation.y = Math.random() * 6;
//     particles.rotation.z = Math.random() * 6;

//     scene.add(particles);
//   }


//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   document.body.style.touchAction = 'none';
//   document.body.addEventListener('pointermove', onPointerMove);

//   window.addEventListener('resize', onWindowResize);
// }

// function onWindowResize() {
//   windowHalfX = window.innerWidth / 2;
//   windowHalfY = window.innerHeight / 2;

//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function onPointerMove(event) {
//   if (event.isPrimary === false) return;

//   mouseX = event.clientX - windowHalfX;
//   mouseY = event.clientY - windowHalfY;
// }


// function animate() {

//   requestAnimationFrame(animate);

//   render();
//   // stats.update();

// }

// function render() {

//   const time = Date.now() * 0.00005;

//   camera.position.x += (mouseX - camera.position.x) * 0.05;
//   camera.position.y += (- mouseY - camera.position.y) * 0.05;

//   camera.lookAt(scene.position);

//   for (let i = 0; i < scene.children.length; i++) {
//     const object = scene.children[i];
//     if (object instanceof THREE.Points) {
//       object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
//     }
//   }

//   for (let i = 0; i < materials.length; i++) {
//     const color = parameters[i][0];
//     // const h = (360 * (color[0] + time) % 360) / 360;
//     const h = 1;
//     materials[i].color.setHSL(h, color[1], color[2]);
//   }
//   renderer.clearDepth();
//   renderer.render(scene, camera);
// }
