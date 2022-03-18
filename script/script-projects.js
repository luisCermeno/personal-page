//start script on doc loaded
document.addEventListener('DOMContentLoaded' , () => {
  // ******** GLOBAL VARIABLES  ******** 
  const projects = document.querySelectorAll('.project-section-container')
  console.log(projects);
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
        projects.forEach(div => {
          div.style.height = 850 + 'px';
        })
        break;
      case 'tablet': 
      projects.forEach(div => {
        div.style.height = 1180 + 'px';
      })
        break;
      default:
        projects.forEach(div => {
          div.style.height = 700 + 'px';
        })
    }
  }

  // *************** EFFECTS ***************
  window.addEventListener("scroll", effects, false)
  function effects () {
    let offset = window.scrollY;
    // Title section
    switch (screenSize) {
      case 'mobile':
        break;
      case 'tablet': 
        break;
      default:
        projects[0].querySelector('.project-text').style.left = -offset + 'px';
        projects[0].querySelector('.project-carousel').style.left = offset + 'px';

    }
  }

})