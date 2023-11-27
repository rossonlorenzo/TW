//showcase avg rating through stars
document.addEventListener("DOMContentLoaded", function () {
  var req1;

  //form population
  const formPSection = document.getElementById('suggestions-professione');
  const formLSection = document.getElementById('suggestions-locazione');
  req1 = new XMLHttpRequest();
  req1.open("GET", 'http://localhost/TW/EazyJobs/api/annunci/getAll.php', true);
  req1.send();

  req1.onload = function () {
    var json = JSON.parse(req1.responseText);
    var htmlP = "";
    var htmlL = "";
    var duplicate = [];
    if (Array.isArray(json.data)) {
      json.data.forEach(function (val) {
        if(!duplicate.includes(val.titolo)){
          duplicate.push(val.titolo);
          htmlP +=
          "<option value='" + val.titolo + "'> \n";
        }
        if(!duplicate.includes(val.locazione)){
          duplicate.push(val.locazione);
          htmlL +=
            "<option value='" + val.locazione + "'> \n";
        }
      })
    } else {
      // Handle the case where 'json' is not an array
      console.error("JSON data is not an array");
    };
    formPSection.innerHTML += htmlP;
    formLSection.innerHTML += htmlL;
  };

  //aziende population
  var req2
  const aziendeSection = document.getElementById('aziende');
  req2 = new XMLHttpRequest();
  req2.open("GET", 'http://localhost/TW/EazyJobs/api/aziende/getAll_byVote.php', true);
  req2.send();
  req2.onload = function () {
    var json = JSON.parse(req2.responseText);
    var html = "";

    if (Array.isArray(json.data)) {
      json.data.forEach(function (val) {
        html +=
          "<li id='aziende-" + val.id + "'>" +
          "<div id='header-aziende'>" +
          "<h3>" + val.nome + "</h3>" +
          "<img src='./assets/SyncLab-logo.png' alt='SyncLab Logo'>" +
          "</div>" +
          "<div id='azienda-grid'>" +
<<<<<<< HEAD
          "<h4>settore:</h4> <p>" + val.settore + "</p>" +
=======
          "<h4>ambito:</h4> <p>" + val.settore + "</p>" +
>>>>>>> f50b236c05fae31e15efded1e67ec15d23398d2d
          "<h4>valutazione:</h4>" +
          "<div class='valutazione-media' data-rating='" + val.media + "'></div>" +
          "</div>" +
          "</li>";
      })
    } else {
      // Handle the case where 'json' is not an array
      console.error("JSON data is not an array");
    };
    aziendeSection.innerHTML += html;


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
  }
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
  if (n > x.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = x.length }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.opacity = 1;
    x[i].style.transform = "translateX(0%)"; // Move slides to the left
  }

  if (slideIndex == 2 || slideIndex == 3) {
    x[0].style.opacity = 0;
  }

  x[slideIndex - 1].style.transform = "translateX(" + -100 * (slideIndex - 1) + "%)"; // Slide to its original position
  dots[slideIndex - 1].className += " active";
}


