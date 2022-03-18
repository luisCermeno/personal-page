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
        break;
      case 'tablet': 
        break;
      default:
        projects[1].querySelector('.project-text').style.left='400px';
        projects[1].querySelector('.project-carousel').style.left='-1000px';

    }
  }

  // *************** EFFECTS ***************
  window.addEventListener("scroll", effects, false)
  function effects () {
    let offset = window.scrollY;
    console.log(offset)
    // Effects
    projects[0].classList.toggle( 'd-none', offset>900 );
    projects[1].classList.toggle( 'd-none', offset<900 );
    switch (screenSize) {
      case 'mobile':
        break;
      case 'tablet': 
        break;
      default:
        projects[0].querySelector('.project-text').style.left = -offset + 'px';
        projects[0].querySelector('.project-carousel').style.left = 2.5*offset + 'px';
        if (offset > 900 && offset < 1350) {
          projects[1].querySelector('.project-text').style.left= (400 - (offset-900)) + 'px';
          projects[1].querySelector('.project-carousel').style.left= (-1000 + 2.5*(offset-900)) + 'px';
        }
    }
  }

})