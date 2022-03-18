//start script on doc loaded
document.addEventListener('DOMContentLoaded' , () => {
  // ******** GLOBAL VARIABLES  ******** 
  const Projects = {
    project1: document.getElementById("project1"),
    project2: document.getElementById("project2"),
    project3: document.getElementById("project3"),
    project4: document.getElementById("project4"),
    project5: document.getElementById("project5"),

  }
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
        for (let [name, element] of Object.entries(Projects)) {
          element.style.height = 850 + 'px';
        }
        break;
      case 'tablet': 
        for (let [name, element] of Object.entries(Projects)) {
          element.style.height = 1180 + 'px';
        }
        break;
      default:
        for (let [name, element] of Object.entries(Projects)) {
          element.style.height = 700 + 'px';
        }
    }
  }
})