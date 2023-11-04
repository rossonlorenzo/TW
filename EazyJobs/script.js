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
const slider = document.querySelector(".slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderContainer = document.querySelector(".slider-container");
const dotsContainer = document.querySelector(".dots-container");

let slideIndex = 0;

nextBtn.addEventListener("click", () => {
  slideIndex++;
  if (slideIndex > 2) slideIndex = 0;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  slideIndex--;
  if (slideIndex < 0) slideIndex = 2;
  updateSlider();
});

for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dotsContainer.appendChild(dot);
    dot.addEventListener("click", () => {
      slideIndex = i;
      updateSlider();
    });
}

function updateDots() {
const dots = dotsContainer.querySelectorAll(".dot");
dots.forEach((dot, i) => {
    if (i === slideIndex) {
    dot.classList.add("active");
    } else {
    dot.classList.remove("active");
    }
});
}

updateDots();

function updateSlider() {
    const containerWidth = sliderContainer.clientWidth;
    const slideWidth = containerWidth;
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    updateDots();
}
 

