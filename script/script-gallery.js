//start script on doc loaded
document.addEventListener('DOMContentLoaded' , () => {
  // ******** GLOBAL VARIABLES  ******** 
  const row = document.getElementById('img-row');
  const N = 53; //number of images

  for (var i = 0; i < N; i++){
    var elem = document.createElement('div')
    elem.classList.add('col-img');
    elem.style.backgroundImage="url(./img/photography/img"+i+".jpg)";
    row.appendChild(elem)
  }
})