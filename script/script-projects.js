//start script on doc loaded
document.addEventListener('DOMContentLoaded' , () => {
  // ******** GLOBAL VARIABLES  ******** 

  const projects = document.querySelectorAll('.project-section-container')
  console.log(projects);
  let screenSize = null; // global variable for media queries
  let halfway = null; // duration of fade-in/ fade-out in scrolled pixels
  let tresholds = []; // array for effects use

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
        // Set halfway of effect (duration of slide-in/out) accroding to screeSize
        halfway = 400;
        offsetText = 400;
        offsetCarousel = 1000;
    }
    
    // Slide in/out effect setup
    let range = halfway
    for (let i = 0; i < projects.length; i++) {
      tresholds.push(range)
      range = range + 2*halfway
    }
    // Set offset of elements
    let type = 1 //(type=1 text slides in from right, type= -1 text slides in from left)
    projects.forEach(project => {
      if (project != projects[0]) {
        if (type == 1) {
          project.querySelector('.project-text').style.left= offsetText + 'px';
          project.querySelector('.project-carousel').style.left= -offsetCarousel + 'px';
        }
        else {
          project.querySelector('.project-text').style.left= -offsetText + 'px';
          project.querySelector('.project-carousel').style.left= offsetCarousel + 'px';
        }
        type = type *-1
      }
    })
  }

  // *************** EFFECTS ***************
  window.addEventListener("scroll", effects, false)
  function effects () {
    let offset = window.scrollY;
    console.log(offset)
    // Effects

    switch (screenSize) {
      case 'mobile':
        break;
      case 'tablet': 
        break;
      default:
        // Toggle container display to none according to offset
        projects[0].classList.toggle( 'd-none', offset > tresholds[0] );
        projects[1].classList.toggle( 'd-none', offset < tresholds[0] || offset > tresholds[1] );
        projects[2].classList.toggle( 'd-none', offset < tresholds[1] || offset > tresholds[2] );
        projects[3].classList.toggle( 'd-none', offset < tresholds[2] || offset > tresholds[3] );

        // Project 0 slide out
        if (offset < tresholds[0]) {
          projects[0].querySelector('.project-text').style.left = -offset + 'px';
          projects[0].querySelector('.project-carousel').style.left = 2.5 * offset + 'px';
        }
        // Project 1 slide in
        else if (offset > tresholds[0] && offset < (tresholds[0] + halfway)) {
          projects[1].querySelector('.project-text').style.left= (400 - (offset-tresholds[0])) + 'px';
          projects[1].querySelector('.project-carousel').style.left= (-1000 + 2.5 * (offset - tresholds[0])) + 'px';
        }
        // Project 1 slide out
        else if (offset > (tresholds[0] + halfway) && offset < tresholds[1]) {
          projects[1].querySelector('.project-text').style.left= (offset- (tresholds[0] + halfway)) + 'px';
          projects[1].querySelector('.project-carousel').style.left=  - 2.5 * (offset - (tresholds[0] + halfway)) + 'px';
        }
        // Project 2 slide in
        else if (offset > tresholds[1] && offset < (tresholds[1] + halfway)) {
          projects[2].querySelector('.project-text').style.left= (-400 + (offset-tresholds[1])) + 'px';
          projects[2].querySelector('.project-carousel').style.left= (1000 - 2.5 * (offset - tresholds[1])) + 'px';
        }
        // Project 2 slide out
        else if (offset > (tresholds[1] + halfway) && offset < tresholds[2]) {
          projects[2].querySelector('.project-text').style.left= -(offset- (tresholds[1] + halfway)) + 'px';
          projects[2].querySelector('.project-carousel').style.left=  2.5 * (offset - (tresholds[1] + halfway)) + 'px';
        }
        // Project 3 slide in
        else if (offset > tresholds[2] && offset < (tresholds[2] + halfway)) {
          projects[3].querySelector('.project-text').style.left= (400 - (offset-tresholds[2])) + 'px';
          projects[3].querySelector('.project-carousel').style.left= (-1000 + 2.5 * (offset - tresholds[2])) + 'px';
        }
    }
  }

})