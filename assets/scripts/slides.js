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