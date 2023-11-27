var req1;

//search and form population
const formPSection = document.getElementById('suggestions-professione');
const formLSection = document.getElementById('suggestions-locazione');
const formASection = document.getElementById('suggestions-azienda');
const selectPSection = document.getElementById('province');
const selectSSection = document.getElementById('settore');
const rangeSSection = document.getElementById('rangeSalario');

req1 = new XMLHttpRequest();
req1.open("GET", 'http://localhost/TW/EazyJobs/api/annunci/getAll.php', true);
req1.send();

req1.onload = function () {
    var json = JSON.parse(req1.responseText);
    var htmlP = "";
    var htmlL = "";
    var html_Azienda = "";
    var html_Provincie = "";
    var html_Settore = "";
    var duplicate = [];
    var min = 0;
    var max = 0;
    if (Array.isArray(json.data)) {
        min = json.data[0].stipendio;
        json.data.forEach(function (val) {
            if (!duplicate.includes(val.titolo)) {
                duplicate.push(val.titolo);
                htmlP +=
                    "<option value='" + val.titolo + "'> \n";
            }
            if (!duplicate.includes(val.locazione)) {
                duplicate.push(val.locazione);
                htmlL +=
                    "<option value='" + val.locazione + "'> \n";
                    html_Provincie +=
                    "<option value='" + val.locazione + "'> " + val.locazione + "</option>\n";
            }

            if (!duplicate.includes(val.nome)) {
                duplicate.push(val.nome);
                html_Azienda +=
                    "<option value='" + val.nome + "'> \n";
            }
            if (!duplicate.includes(val.settore)) {
                duplicate.push(val.settore);
                html_Settore +=
                    "<option value='" + val.settore + "'> " + val.settore + "</option>\n";
            }

            if (val.stipendio > max)
                max = val.stipendio;

            if (val.stipendio < min)
                min = val.stipendio;
        })
    } else {
        // Handle the case where 'json' is not an array
        console.error("JSON data is not an array");
    };
    formPSection.innerHTML += htmlP;
    formLSection.innerHTML += htmlL;
    formASection.innerHTML += html_Azienda;
    selectPSection.innerHTML += html_Provincie;
    selectSSection.innerHTML += html_Settore;
    rangeSSection.setAttribute("min", min);
    rangeSSection.setAttribute("max", max);
};


var req1;

// annunci population
const annunciSection = document.getElementById('annunci-list');

req2 = new XMLHttpRequest();
url = 'http://localhost/TW/EazyJobs/api/annunci/getAll.php';
params = window.location.href.split('html');
url = url + params[1];
req2.open("GET", url, true);
req2.send();

req2.onload = function () {
    var json = JSON.parse(req2.responseText);
    var html = "";
    if (Array.isArray(json.data)) {
        json.data.forEach(function (val) {
            //annunci.push(val);
            html +=
                "<li id='" + val.nome + "'>" +
                "<div class='header-annunci'>" +
                "<a href='#' class='annuncio-link' data-target='annuncio-completo'>" +
                "<h3>" + val.titolo + "</h3>" +
                "</a>" +
                "<h4>" + val.nome + "</h4>" +
                //logo
                "<img src='./assets/SyncLab-logo.png' alt='SyncLab-logo'>" +
                "</div>" +

                "<h5>Descrizione:</h5>" +
                "<p>" + val.desc_breve + "</p>" +

                "<ul class='job-info'>" +
                "<li><h5>Loco:</h5><p>" + val.locazione + "</p></li>" +
                "<li><h5>Stipendio medio:</h5><p>" + val.stipendio + "€</p></li>" +
                "<li><h5>Contatti:</h5><p>" + val.mail + "</p></li>" +
                "</ul>" +
                "</li>";
        })
    } else {
        // Handle the case where 'json' is not an array
        console.error("JSON data is not an array");
    };
    annunciSection.innerHTML += html;

    // Display the first annunci-completo
    displayAnnuncioCompleto(json.data[0]);

    const annuncioLinks = document.querySelectorAll(".annuncio-link");

    annuncioLinks.forEach(function (link, index) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const target = link.getAttribute("data-target");
            const annuncioCompleto = document.getElementById(target);

            // Display the clicked annunci-completo
            displayAnnuncioCompleto(json.data[index]);

            const computedStyle = window.getComputedStyle(annuncioCompleto);

            // Hide the smaller annuncio [only if annuncio-completo is not already present on screen]
            if (computedStyle.display === "none") {
                // Hide all small annunci
                const smallAnnunci = document.querySelectorAll(".annunci li");
                smallAnnunci.forEach(function (annuncio) {
                    annuncio.style.display = "none";
                });

                annuncioCompleto.style.display = "block";
            } else {
                /* Refresh the displayed annuncio */
            }
        });
    });
};

function displayAnnuncioCompleto(data) {
    var htmlC = "";
    const annuncioCSection = document.getElementById('annuncio-completo');
    ml = "";
    var remoto = "";
    var presenza = "";

    if (data.presenza == 1) {
        ml = " In presenza";
    }

    if (data.remoto == 1) {
        ml = "Da remoto";
        if (data.presenza == 1) {
            ml += " e in presenza";
        }
    }

    htmlC +=
        "<button id='bottone-annunci'>Torna agli annunci</button>" +

        "<div class='header-annunci'>" +
        "<h3>" + data.titolo + "</h3>" +
        "<h4>" + data.nome + "</h4>" +
        //logo
        "<img src='./assets/SyncLab-logo.png' alt='SyncLab-logo'>" +
        "</div>" +

        "<h5>Descrizione:</h5>" +
        "<p>" + data.desc_completa + "</p>" +

        "<ul class='annuncio-info'>" +
        //da fare
        "<li><h5>Candidati all'annuncio:</h5><p>5</p></li>" +
        "<li><h5>Recensioni dell'azienda:</h5><p>20</p></li>" +
        "</ul>" +

        "<div class='Dettagli' id='dettagli'>" +
        "<ul class='job-complete-info'>" +
        "<li><h5>Data di pubblicazione:</h5><p>" + data.data_pub + "</p></li>" +
        "<li><h5>Loco:</h5><p>" + data.locazione + "</p></li>" +
        "<li><h5>Settore:</h5><p>" + data.settore + "</p></li>" +
        "<li><h5>Modalita' di lavoro:</h5><p>" + ml + "</p></li>" +
        "<li><h5>Tipo di contratto:</h5><p>" + data.contratto + "</p></li>" +
        "<li><h5>Livello di istruzione richiesto:</h5><p>" + data.livello_istruzione + "</p></li>" +
        "<li><h5>Esperienza minima richiesta:</h5><p>" + data.esperienza + "</p></li>" +
        "<li><h5>Stipendio:</h5><p>" + data.stipendio + " €</p></li>" +
        "<li><h5>Contatti:</h5><p>s" + data.mail + "</p></li>" +
        "</ul>" +
        "</div>" +

        "<ul class='azioni-aggiuntive'>" +
        "<li><button id='bottone-dettagli'>Mostra più dettagli</button></li>" +
        "<li><button type='submit' id='bottone-candidati'>Candidati</button></li>" +
        "<li><button type='submit' id='bottone-salva'>Salva</button></li>" +
        "</ul>";

    annuncioCSection.innerHTML = htmlC;

    const showDetailsButton = document.getElementById("bottone-dettagli");
    const dettagli = document.getElementById("dettagli");

    showDetailsButton.addEventListener("click", () => {
        if (dettagli.style.display === "none" || !dettagli.style.display) {
            dettagli.style.display = "block";
            showDetailsButton.textContent = "Nascondi dettagli";
        } else {
            dettagli.style.display = "none";
            showDetailsButton.textContent = "Mostra più dettagli";
        }
    });

    const annunciButton = document.getElementById("bottone-annunci");
    const annunciCompleto = document.getElementById('annuncio-completo');
    annunciButton.addEventListener("click", function () {
        annunciCompleto.style.display = "none";

        // Show all small annunci
        const smallAnnunci = document.querySelectorAll(".annunci li");
        smallAnnunci.forEach(function (annuncio) {
            annuncio.style.display = "block";
        });
    });

    // NON SO se sia il modo corretto per farlo, però la gaggi deve ancora dirci quindi io intato 
    // l'ho fatto speriamo non sia da cambiare
    // const currentURL = window.location.href;
    // const hasParameters = currentURL.includes('?');
    // if (hasParameters) {
    //     filter();
    // }
}

document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.getElementById("bottone-filtri");
    const jobFilters = document.getElementById("jobFilters");

    filterButton.addEventListener("click", function () {
        if (jobFilters.style.display === "none" || jobFilters.style.display === "") {
            jobFilters.style.display = "block";
            filterButton.textContent = "Nascondi filtri";
        } else {
            jobFilters.style.display = "none";
            filterButton.textContent = "Mostra filtri";
        }
    });


});

