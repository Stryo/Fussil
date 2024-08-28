let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
}

function ExitTutorial(){
   var exitslide = document.getElementById("Introduction")
   exitslide.style.display = "none"
}

function OpenTutorial(){
    var exitslide = document.getElementById("Intro")
    exitslide.style.display = "none"
    var exitslide = document.getElementById("Introduction")
   exitslide.style.display = "flex"
    var exitslide = document.getElementById("Tutorial")
    exitslide.style.display = "flex"
 }