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


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//navigator.userAgent.toLowerCase().match(/mobile/i)
if (false) {

} else {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  ctx.fillStyle = "#ff79c6";
  ctx.font = "20px Arial"
  // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  var code = ["I HATE HTML REEEE"];
  var things = [];
  var THINGCOUNT = 1;
  for (var i = 0; i < THINGCOUNT; i++) {
      var a = {};
      a.code = code[0];
      a.x = Math.random()*(window.innerWidth - 200);
      a.y = Math.random()*100 - 250;
      a.speed = 2;
      things.push(a);
  }

  setInterval(function() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < THINGCOUNT; i++) {
          var a = things[i];
          ctx.fillText(a.code, a.x, a.y);
          a.y += a.speed;
          if (a.y > window.innerHeight + 30) {
            a.x = Math.random()*(window.innerHeight - 200);
            a.y = Math.random()*100 - 250;
          }
      }
  }, 1000/60);

}

window.onresize = function(event) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.fillStyle = "#ff79c6";
  ctx.font = "30px Arial"
};