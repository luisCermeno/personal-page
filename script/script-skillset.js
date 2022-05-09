//start script on doc loaded
document.addEventListener('DOMContentLoaded' , () => {
  // ******** GLOBAL VARIABLES  ******** 
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
        titleSection.style.height = 720 + "px";
    }
  }
})