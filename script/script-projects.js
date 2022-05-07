//start script on doc loaded
document.addEventListener('DOMContentLoaded' , () => {
  // ******** GLOBAL VARIABLES  ******** 
  const wrapper = document.querySelector('#wrapper')
  const main = document.querySelector('#main')
  const projects = document.querySelectorAll('.project-section-container')
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
    // Height of elements
    wrapper.style.height = (window.innerHeight-document.querySelector('.navbar').offsetHeight) + 'px';
    main.style.height = (parseInt(wrapper.style.height) * nProjects+ + 300) + 'px';
    // Styling
    // switch (screenSize) {
    //   case 'mobile':
    //     break;
    //   case 'tablet': 
    //     break;
    //   default:
    // }
  }

  // *************** EFFECTS ***************
  // Adjust wrapper to window innerwidth on resize
  window.addEventListener('resize', ()=> {
    wrapper.style.height = (window.innerHeight-document.querySelector('.navbar').offsetHeight) + 'px';
    main.style.height = (parseInt(wrapper.style.height) * nProjects+ + 300) + 'px';
    })

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
    // not for first and last project (final section)
    if (project != projects[0] && project != projects[nProjects - 1]) {
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
    // For each project, evaluate treshold effect, and apply.
    for (let i = 0; i < nProjects; i++) {
      // First project only:
      if (i == 0) {
        projects[i].classList.toggle( 'd-none', offset > tresholds[i] ); // Toggle display
        if (offset < tresholds[i]) {  // Slide out
          projects[i].querySelector('.project-text').style.left = -offset + 'px';
          projects[i].querySelector('.project-carousel').style.left = speedCarousel * offset + 'px';
        }
      }
      else {
        sign = ((-1)**(i+1));
        // Last project only
        if (i == nProjects-1) {
          projects[i].classList.toggle( 'd-none', offset < tresholds[i-1]);
        }
        // Every other project
        else {
          projects[i].classList.toggle( 'd-none', offset < tresholds[i-1] || offset > tresholds[i] ) // Toggle display
          if (offset > tresholds[i-1] && offset < (tresholds[i-1] + halfway)) { // Slide in
            projects[i].querySelector('.project-text').style.left= sign * (offsetText - (offset-tresholds[i-1])) + 'px';
            projects[i].querySelector('.project-carousel').style.left= sign * (-offsetCarousel + speedCarousel * (offset - tresholds[i-1])) + 'px';
          }
          else if (offset > (tresholds[i-1] + halfway) && offset < tresholds[i]) { // Slide out
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