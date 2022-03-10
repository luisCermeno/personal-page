//start deviceipt on doc loaded
document.addEventListener('DOMContentLoaded' , function(){
  //GET DOCUMENT ELEMENTS
  const skill1 = document.getElementById("skill1")
  const skill2 = document.getElementById("skill2")
  const skill3 = document.getElementById("skill3")
  const skill4 = document.getElementById("skill4")
  const titleSection = document.getElementById("titleSection")
  const titleSectionHeight = titleSection.clientHeight;
  const title = document.getElementById("title");


  //MEDIA QUERIES
  //Create media queries
  const Queries = {
    mobile : null,
    tablet: window.matchMedia('(min-width: 577px)'),
    computer : window.matchMedia('(min-width: 769px)')
  }
  // Listen for media query changes
  for (let [device, mediaQuery] of Object.entries(Queries)) {
  if (mediaQuery) mediaQuery.addEventListener('change', mediaQueryHandler);
  }
  // First event
  mediaQueryHandler();
  // Media query handler function
  function mediaQueryHandler() {
  let size = null;
  for (let [device, mediaQuery] of Object.entries(Queries)) {
    if (!mediaQuery || mediaQuery.matches) size = device;
  }
  if (size == 'mobile'){
    console.log('850px')
  } else if (size == 'tablet') {
    console.log('1024px')
  } else {
    console.log('800px')
  }
  }



  //EFFECTS
  window.addEventListener("scroll", function() {
    let offset = window.scrollY;
    //title section effect
    titleSection.style.height = (titleSectionHeight - 4 * offset) + "px";
    title.style.opacity = 1 - 0.015 * offset;
    //skill img effect
    skill1.style.backgroundPositionY = offset * 0.7 + "px";
    skill2.style.backgroundPositionY = offset * 0.7 + "px";
    skill3.style.backgroundPositionY = offset * 0.7 + "px";
    skill4.style.backgroundPositionY = offset * 0.7 + "px";
  })
})



