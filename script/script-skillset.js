//start deviceipt on doc loaded
document.addEventListener('DOMContentLoaded' , function(){
  //GET DOCUMENT ELEMENTS
  const skill1 = document.getElementById("skill1")
  const skill2 = document.getElementById("skill2")
  const skill3 = document.getElementById("skill3")
  const skill4 = document.getElementById("skill4")
  const titleSection = document.getElementById("titleSection")
  // const titleSectionHeight = titleSection.clientHeight;
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
    //call effects
    console.log('calling effects with size=' + size)
  //FIX:: EVENT LISTENER DOES NOT UMBIND PROPERLY!!!
    window.removeEventListener('scroll', effects, false);
    window.addEventListener("scroll", effects, false)

    function effects () {
      let offset = window.scrollY;
      //title section effects
      if (size == 'mobile') {
        console.log('running effects for mobile');
        titleSection.style.height = (850 - 4 * offset) + "px";
      } else if (size == 'tablet') {
        console.log('running effects for tablet');
        titleSection.style.height = (1024 - 4 * offset) + "px";
      } else {
        console.log('running effects for computer');
        titleSection.style.height = (400 - 4 * offset) + "px";
      }
      //title opacity 
      title.style.opacity = 1 - 0.015 * offset;
      //skill img effect
      skill1.style.backgroundPositionY = offset * 0.7 + "px";
      skill2.style.backgroundPositionY = offset * 0.7 + "px";
      skill3.style.backgroundPositionY = offset * 0.7 + "px";
      skill4.style.backgroundPositionY = offset * 0.7 + "px";
    }
  }



  //EFFECTS

})


