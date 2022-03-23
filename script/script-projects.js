//start script on doc loaded
document.addEventListener('DOMContentLoaded' , () => {
  // ******** GLOBAL VARIABLES  ******** 
  const wrapper = document.querySelector('#wrapper')
  const main = document.querySelector('#main')
  const projects = document.querySelectorAll('.project-section-container')
  console.log(projects);
  let nProjects = projects.length;
  let screenSize = null; // global variable for media queries
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
        // Height of elements
        wrapper.style.height = 700 + 'px';
        main.style.height = (parseInt(wrapper.style.height) * nProjects+ + 300) + 'px';
    }

  }

  // *************** EFFECTS ***************
  // SETUP

  // Slide effect parameters
  let halfway = (parseInt(wrapper.style.height))/2;
  let offsetText = halfway;
  let offsetCarousel = 1.1 * (document.querySelector('.project-img').offsetWidth) ;
  let speedCarousel = offsetCarousel / halfway;
  let range = halfway
  for (let i = 0; i < nProjects; i++) {
    tresholds.push(range)
    range = range + 2 * halfway
  }
  // Offset of elements (out of screen)
  let sign = 1 //(sign=1 text slides in from right, sign= -1 text slides in from left)
  projects.forEach(project => {
    if (project != projects[0]) {
      if (sign == 1) {
        project.querySelector('.project-text').style.left= offsetText + 'px';
        project.querySelector('.project-carousel').style.left= -offsetCarousel + 'px';
      }
      else {
        project.querySelector('.project-text').style.left= -offsetText + 'px';
        project.querySelector('.project-carousel').style.left= offsetCarousel + 'px';
      }
      sign = sign *-1
    }
  })
  // Scroll event listener
  window.addEventListener("scroll", effects, false)
  function effects () {
    let offset = window.scrollY;
    console.log(offset)
    switch (screenSize) {
      case 'mobile':
        break;
      case 'tablet': 
        break;
      default:
        // For each project, evaluate treshold effect, and apply.
        for (let i = 0; i < nProjects; i++) {
          if (i == 0) {
            // Toggle display
            projects[i].classList.toggle( 'd-none', offset > tresholds[i] );
            // Slide out
            if (offset < tresholds[i]) {
              projects[i].querySelector('.project-text').style.left = -offset + 'px';
              projects[i].querySelector('.project-carousel').style.left = speedCarousel * offset + 'px';
            }
          }
          else {
            sign = ((-1)**(i+1));
            // Toggle display
            if (i == nProjects-1) {
              projects[i].classList.toggle( 'd-none', offset < tresholds[i-1]);
            }
            else {
              projects[i].classList.toggle( 'd-none', offset < tresholds[i-1] || offset > tresholds[i] );
            }
            // Slide in
            if (offset > tresholds[i-1] && offset < (tresholds[i-1] + halfway)) {
              projects[i].querySelector('.project-text').style.left= sign * (offsetText - (offset-tresholds[i-1])) + 'px';
              projects[i].querySelector('.project-carousel').style.left= sign * (-offsetCarousel + speedCarousel * (offset - tresholds[i-1])) + 'px';
            }
            // Slide out
            else if (offset > (tresholds[i-1] + halfway) && offset < tresholds[i]) {
              if (i != nProjects-1) {
                projects[i].querySelector('.project-text').style.left = sign * (offset- (tresholds[i-1] + halfway)) + 'px';
                projects[i].querySelector('.project-carousel').style.left=  sign * (- speedCarousel * (offset - (tresholds[i-1] + halfway))) + 'px';
              }
            }
          }
        }
    }
  }
})