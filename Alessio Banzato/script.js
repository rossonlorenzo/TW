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

//needs to be made responsive, can't translate slide by a fixed amount
function updateSlider() {
  const slideWidth = 1024;
  slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
  updateDots();
}



document.getElementById('professione').addEventListener('input', function() {
  const input = this.value.toLowerCase();
  const suggerimenti = document.getElementById('suggerimenti');
  const professioni = ['Sviluppatore Frontend', 'Grafico Pubblicitario', 'Ingegnere Civile', 'Responsabile Marketing',
                        'Sviluppatore Java', 'Architetto d\'Interni', 'Sviluppatore iOS', 'Assistente Sanitario',
                        'Progettista Web', 'Gestore Museo', 'Gestore Progetti', 'Sviluppatore Mobile', 'Gestore Risorse Umane',
                        'Analista Dati', 'Assistente Sociale', 'Ingegnere Elettronico', 'Project Manager', 'Insegnante Scuola Elementare'];

  // Pulisci la lista di suggerimenti
  suggerimenti.innerHTML = '';

  // Filtra le professioni in base all'input
  professioni.forEach(professione => {
      if (professione.toLowerCase().includes(input)) {
          const li = document.createElement('li');
          li.textContent = professione;
          suggerimenti.appendChild(li);
      }
  });

  // Mostra o nascondi la lista di suggerimenti a seconda se ci sono suggerimenti
  suggerimenti.style.display = suggerimenti.children.length > 0 ? 'block' : 'none';
});

document.getElementById('locazione').addEventListener('input', function() {
  const input = this.value.toLowerCase();
  const suggerimenti = document.getElementById('suggerimenti');
  const province = ['Milano', 'Roma', 'Napoli', 'Firenze', 'Messina', 'Bari'];

  // Pulisci la lista di suggerimenti
  suggerimenti.innerHTML = '';

  // Filtra le province in base all'input
  province.forEach(provincia => {
      if (provincia.toLowerCase().includes(input)) {
          const li = document.createElement('li');
          li.textContent = provincia;
          suggerimenti.appendChild(li);
      }
  });

  // Mostra o nascondi la lista di suggerimenti a seconda se ci sono suggerimenti
  suggerimenti.style.display = suggerimenti.children.length > 0 ? 'block' : 'none';
});

// Aggiungi un gestore di eventi per il clic su un suggerimento
document.getElementById('suggerimenti').addEventListener('click', function(e) {
  if (e.target && e.target.nodeName === 'LI') {
      document.getElementById('locazione').value = e.target.textContent;
      this.style.display = 'none';
  }
});


document.getElementById('professione').addEventListener('blur', function() {
  const suggerimenti = document.getElementById('suggerimenti');
  suggerimenti.style.display = 'none';
});


document.getElementById('professione').addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
      this.blur(); // Toglie il focus dall'input
      const suggerimenti = document.getElementById('suggerimenti');
      suggerimenti.style.display = 'none'; // Nasconde la tendina
  }
});

document.getElementById('locazione').addEventListener('blur', function() {
  const suggerimenti = document.getElementById('suggerimenti');
  suggerimenti.style.display = 'none';
});


document.getElementById('locazione').addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
      this.blur(); // Toglie il focus dall'input
      const suggerimenti = document.getElementById('suggerimenti');
      suggerimenti.style.display = 'none'; // Nasconde la tendina
  }
});
