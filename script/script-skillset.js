//GET ELEMENTS ON DOC LOADED
document.addEventListener('DOMContentLoaded' , function(){
  const title = document.getElementById("title")
  const skill1 = document.getElementById("skill1")
  const skill2 = document.getElementById("skill2")
  const skill3 = document.getElementById("skill3")
  const skill4 = document.getElementById("skill4")
})


//PARALLEX EFFECT
window.addEventListener("scroll", function() {
  let offset = window.scrollY;
  title.style.height = (400 - 3 * offset) + "px";
  skill1.style.backgroundPositionY = offset * 0.7 + "px";
  skill2.style.backgroundPositionY = offset * 0.7 + "px";
  skill3.style.backgroundPositionY = offset * 0.7 + "px";
  skill4.style.backgroundPositionY = offset * 0.7 + "px";
})