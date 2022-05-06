//start script on doc loaded
document.addEventListener('DOMContentLoaded' , () => {
  // ******** GLOBAL VARIABLES  ******** 
  const skill1 = document.getElementById("skill1")
  const skill2 = document.getElementById("skill2")
  const skill3 = document.getElementById("skill3")
  const skill4 = document.getElementById("skill4")
  const titleSection = document.getElementById("titleSection")
  const title = document.getElementById("title");
  let screenSize = null; // global variable for media queries

  // ******** MEDIA QUERIES / STYLING ********
  // Create media queries
  const Queries = {
    mobile : null,
    tablet: window.matchMedia('(min-width: 577px)'),
    computer : window.matchMedia('(min-width: 769px)')
  }
  // First event
  mediaQueryHandler();
  // Add an change listener for each media query
  for (let [device, mediaQuery] of Object.entries(Queries)) {
    if (mediaQuery) mediaQuery.addEventListener('change', mediaQueryHandler);
  }
  // Handler function and styling
  function mediaQueryHandler() {
    // Check for match on eaech query, and update screenSize (default: mobile)
    for (let [device, mediaQuery] of Object.entries(Queries)) {
      if (!mediaQuery || mediaQuery.matches) screenSize = device;
    }
    console.log('screenSize is:' + screenSize)
    //Styling
    switch (screenSize) {
      case 'mobile':
        titleSection.style.height = 850 + "px";
        break;
      case 'tablet': 
        titleSection.style.height = 1024 + "px";
        break;
      default:
        titleSection.style.height = 800 + "px";
    }
  }

  // *************** EFFECTS ***************
  // window.removeEventListener('scroll', effects, false);
  window.addEventListener("scroll", effects, false)
  function effects () {
    let offset = window.scrollY;
    // Title section
    switch (screenSize) {
      case 'mobile':
        titleSection.style.height = (850 - 4 * offset) + "px";
        break;
      case 'tablet': 
        titleSection.style.height = (1024 - 4 * offset) + "px";
        break;
      default:
        titleSection.style.height = (800 - 1.5 * offset) + "px";
    }
    // Title opacity 
    title.style.opacity = 1 - 0.015 * offset;
    // Skill img parallax
    skill1.style.backgroundPositionY = offset * 0.7 + "px";
    skill2.style.backgroundPositionY = offset * 0.7 + "px";
    skill3.style.backgroundPositionY = offset * 0.7 + "px";
    skill4.style.backgroundPositionY = offset * 0.7 + "px";
  }
})