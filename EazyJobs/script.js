//showcase avg rating through stars
document.addEventListener("DOMContentLoaded", function () {
    const starRatingElements = document.querySelectorAll(".valutazione-media");

    starRatingElements.forEach(function (starRating) {
        const rating = parseFloat(starRating.getAttribute("data-rating"));
        let stars = "";

        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
                stars += "★";
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                // aggiungere gestione parte decimale (e.g., 2.5) aka half-stars
                stars += "☆";
            } else {
                stars += "☆";
            }
        }
        starRating.innerHTML = stars;
    });
});

//splide slider implementation
var slideIndex = 1;
showDivs(slideIndex);

document.getElementById("prevBtn").addEventListener("click", () => {
  showDivs(slideIndex += -1);
})

document.getElementById("nextBtn").addEventListener("click", () => {
    showDivs(slideIndex += 1);
})

document.getElementById("dot1").addEventListener("click", () => {
    showDivs(slideIndex = 1);
})

document.getElementById("dot2").addEventListener("click", () => {
    showDivs(slideIndex = 2);
})

document.getElementById("dot3").addEventListener("click", () => {
    showDivs(slideIndex = 3);
})

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.opacity = 1;
    x[i].style.transform = "translateX(0%)"; // Move slides to the left
  }

  if(slideIndex== 2 || slideIndex ==3){
    x[0].style.opacity = 0;
  }

  x[slideIndex-1].style.transform = "translateX("+-100* (slideIndex-1)+"%)"; // Slide to its original position
  dots[slideIndex-1].className += " active";
}


