/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                HOME JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  var req1;
  //form population
  const formPSection = document.getElementById('suggerimenti-professione');
  const formLSection = document.getElementById('suggerimenti-locazione');
  if (formPSection && formLSection) {
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
  }

  //aziende population
  var req2
  const aziendeSection = document.getElementById('aziende');
  if (aziendeSection) {
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
            "<img src='./assets/logos/SyncLab-logo.png' alt='SyncLab Logo'>" +
            "</div>" +
            "<div id='azienda-grid'>" +
            "<h4>settore:</h4> <p>" + val.settore + "</p>" +
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
  }
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                HOME JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ANNUNCI JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
var req3;
//search and form population
const formPSection = document.getElementById('suggerimenti-professione');
const formLSection = document.getElementById('suggerimenti-locazione');
const formASection = document.getElementById('suggerimenti-azienda');
const selectPSection = document.getElementById('province');
const selectSSection = document.getElementById('settore');
const rangeSSection = document.getElementById('rangeSalario');

if (formPSection && formLSection && formASection && selectPSection && selectSSection && rangeSSection) {
    req3 = new XMLHttpRequest();
    req3.open("GET", 'http://localhost/TW/EazyJobs/api/annunci/getAll.php', true);
    req3.send();

    req3.onload = function () {
        var json = JSON.parse(req3.responseText);
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
}


var req4;
// annunci population
const annunciSection = document.getElementById('annunci-listaAnnunci');

if (annunciSection) {
    req4 = new XMLHttpRequest();
    url = 'http://localhost/TW/EazyJobs/api/annunci/getAll.php';
    params = window.location.href.split('html');
    url = url + params[1];
    req4.open("GET", url, true);
    req4.send();

    req4.onload = function () {
        var json = JSON.parse(req4.responseText);
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
                    "<img src='./assets/logos/SyncLab-logo.png' alt='SyncLab-logo'>" +
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
            "<img src='./assets/logos/SyncLab-logo.png' alt='SyncLab-logo'>" +
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
        // 
        // quanto sarebbe bello avere indicazioni precise -_- 
    }

    document.addEventListener("DOMContentLoaded", function () {
        const filterButton = document.getElementById("bottone-filtri");
        const filtriRicerca = document.getElementById("filtri-ricerca");

        filterButton.addEventListener("click", function () {
            if (filtriRicerca.style.display === "none" || filtriRicerca.style.display === "") {
                filtriRicerca.style.display = "block";
                filterButton.textContent = "Nascondi filtri";
            } else {
                filtriRicerca.style.display = "none";
                filterButton.textContent = "Mostra filtri";
            }
        });
    });
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ANNUNCI JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                USER JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
//annunci
var req5;
const annunciSectionUser = document.getElementById('user-listaAnnunci');

if (annunciSectionUser) {
    req5 = new XMLHttpRequest();
    url = 'http://localhost/TW/EazyJobs/api/annunci/getAll.php';    //da modificare usando getAllSaved.php..
    params = window.location.href.split('html');
    url = url + params[1];
    req5.open("GET", url, true);
    req5.send();

    req5.onload = function () {
        var json = JSON.parse(req5.responseText);
        var html = "";
        if (Array.isArray(json.data)) {
            json.data.forEach(function (val) {
                //annunci.push(val);
                html +=
                    "<li id='" + val.nome + "'>" +
                    "<div class='header-annunci'>" +
                    "<h3>" + val.titolo + "</h3>" +
                    "</a>" +
                    "<h4>" + val.nome + "</h4>" +
                    //logo
                    "<img src='./assets/logos/SyncLab-logo.png' alt='SyncLab-logo'>" +
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
        annunciSectionUser.innerHTML += html;
    }
}

//recensioni
var req6;
const recensioniSectionUser = document.getElementById('user-recensioni');

if (recensioniSectionUser) {
    req6 = new XMLHttpRequest();
    req6.open("GET", 'http://localhost/TW/EazyJobs/api/valutazioni/getall_byAziendaId.php', true);  //da modificare usando getall_byUserId..
    req6.send();

    req6.onload = function () {
        var json = JSON.parse(req6.responseText);
        var html = "";
        if (Array.isArray(json.data)) {
            json.data.forEach(function (val) {
                html += `
                    <li>
                        <h3>${val.nome}</h3>
                        <div class='valutazione'>
                            <h4>Valutazione:</h4><p>${val.voto}</p>
                        </div>
                        <p>${val.commento}</p>
                    </li>`;
            })
        } else {
            console.error("JSON data is not an array");
        };
        recensioniSectionUser.innerHTML += html;
    }
}

function showHideCards(id) {
    var list = document.getElementById(id);
    var header = document.getElementById(id + "-header");
    if (list.className == "hiding") {
      list.className = "showing";
      header.className = "showing";
    } else {
      list.className = "hiding";
      header.className = "hiding";
    }
}

function changeButton(name) {
    var btn = document.getElementsByName(name)[0];
    var span = btn.children[0];
    if(span.className == "toggle show") {
        span.className = "toggle hide";
        btn.setAttribute("aria-expanded","true");
        
    } else {
        span.className = "toggle show";
        btn.setAttribute("aria-expanded","false");
        
    }
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                USER JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ADMIN JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
var req7;
// annunci population
const annunciSectionAdmin = document.getElementById('admin-listaAnnunci');

if (annunciSectionAdmin) {
    req7 = new XMLHttpRequest();
    req7.open("GET", 'http://localhost/TW/EazyJobs/api/annunci/getAllbyId.php', true);
    req7.send();

    req7.onload = function () {
        var json = JSON.parse(req7.responseText);
        var html = "";
        if (Array.isArray(json.data)) {
            json.data.forEach(function (val) {
                html +=
                    "<li id='" + val.id + "'>" +
                    "<div class='header-annunci'>" +
                    "<h3>" + val.titolo + "</h3>" +
                    "</a>" +
                    "<h4>" + val.nome + "</h4>" +
                    //logo
                    "<img src='./assets/logos/SyncLab-logo.png' alt='SyncLab-logo'>" +
                    "</div>" +

                    "<h5>Descrizione:</h5>" +
                    "<p>" + val.desc_breve + "</p>" +

                    "<ul class='job-info'>" +
                    "<li><h5>Loco:</h5><p>" + val.locazione + "</p></li>" +
                    "<li><h5>Stipendio medio:</h5><p>" + val.stipendio + "€</p></li>" +
                    "<li><h5>Contatti:</h5><p>" + val.mail + "</p></li>" +
                    "</ul>" +

                    `
                    <button class="bottone-modifica" data-id="${val.id}">Modifica</button>
                    <button class="bottone-elimina" data-id="${val.id}">Elimina</button>
                    `
                    "</li>";
            })
        } else {
            // Handle the case where 'json' is not an array
            console.error("JSON data is not an array");
        };
        annunciSectionAdmin.innerHTML += html;
    }

    //Funzione di modifica
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('bottone-modifica')) {
            const annuncioId = event.target.getAttribute('data-id');
            const data = { id: annuncioId };
            const formData = new URLSearchParams(data).toString();
            window.location.href = `http://localhost/TW/EazyJobs/PubblicaAnnuncio.html?${formData}`;
        }
    });   

    //Funzione di eliminazione
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('bottone-elimina')) {
            const annuncioId = event.target.getAttribute('data-id');

            //ask for confirmation
            const confirmation = confirm('Sei sicuro di voler eliminare questo annuncio?');

            if (confirmation) {
                const data = { id: annuncioId };
                fetch('http://localhost/TW/EazyJobs/api/annunci/delete.php', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    // Handle success or failure message from PHP
                    if (data === 'Success') {
                        console.log('Success');
                        const deletedItem = document.getElementById(annuncioId);
                        if (deletedItem) {
                            deletedItem.remove();
                        } else {
                            console.error('Element not found');
        }
                    } else {
                        console.error('Unexpected response:', data);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
            else {
                console.log('Deletion was cancelled.');
            }
        };
    });
}

var req8;
//recensioni population
const recensioniSectionAdmin = document.getElementById('admin-recensioni');

if (recensioniSectionAdmin) {
    req8 = new XMLHttpRequest();
    req8.open("GET", 'http://localhost/TW/EazyJobs/api/valutazioni/getall_byAziendaId.php', true);
    req8.send();

    req8.onload = function () {
        var json = JSON.parse(req8.responseText);
        var html = "";
        if (Array.isArray(json.data)) {
            json.data.forEach(function (val) {
                html += `
                    <li>
                        <h3>${val.nome}</h3>
                        <div class='valutazione'>
                            <h4>Valutazione:</h4><p>${val.voto}</p>
                        </div>
                        <p>${val.commento}</p>
                    </li>`;
            })
        } else {
            console.error("JSON data is not an array");
        };
        recensioniSectionAdmin.innerHTML += html;
    }
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ADMIN JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                PUBBLICA_ANNUNCIO JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    const pubblicaButton = document.getElementById('pubblicaAnnuncio-bottone');
    const publishForm = document.getElementById('publishJob-form');

    if (pubblicaButton) {
        pubblicaButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Fetch form data
            const formData = new FormData(publishForm);

            // Perform client-side validation
            let isValid = true;
            const requiredFields = ['titolo', 'desc_breve', 'desc_completa', 'locazione', 'settore'];

            requiredFields.forEach(fieldName => {
                const field = formData.get(fieldName);
                const inputElement = document.getElementById(fieldName);

                if (!field.trim() || !isNaN(field)) {
                    isValid = false;
                    inputElement.style.border = '2px solid red';
                    inputElement.placeholder = 'Campo obbligatorio. Inserire del testo.';
                } else {
                    inputElement.style.border = '';
                    inputElement.placeholder = '';
                }
            });

            const remotoCheckbox = document.getElementById('modalità-remoto');
            const presenzaCheckbox = document.getElementById('modalità-presenza');
            const checkboxGroup = document.querySelector('.checkbox-group');
            if (!remotoCheckbox.checked && !presenzaCheckbox.checked) {
                isValid = false;
                checkboxGroup.style.border = '2px solid red';
            } else {
                checkboxGroup.style.border = '';
            }

            const determinatoRadio = document.getElementById('determinato');
            const indeterminatoRadio = document.getElementById('indeterminato');
            const radioGroup = document.querySelector('.radio-group');
            if (!determinatoRadio.checked && !indeterminatoRadio.checked) {
                isValid = false;
                radioGroup.style.border = '2px solid red';
            } else {
                radioGroup.style.border = '';
            }

            const stipendioField = formData.get('stipendio');
            const stipendioElement = document.getElementById('stipendio');

            if (isNaN(stipendioField) || stipendioField === '') {
                isValid = false;
                stipendioElement.style.border = '2px solid red'; 
                stipendioElement.placeholder = 'Campo obbligatorio. Inserire un numero.'; 
            } else {
                stipendioElement.style.border = '';
                stipendioElement.placeholder = ''; 
            }

            if (!isValid) {
                return;
            }

            // Make a POST request to insertNew.php or modifyOld.php
            console.log(window.location.search);
            const params = new URLSearchParams(window.location.search);
            const annuncioId = params.get('id');
            console.log(annuncioId);
            if (annuncioId) {
                formData.append('id', annuncioId);
                fetch('http://localhost/TW/EazyJobs/api/annunci/modifyOld.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    // Handle success or failure message from PHP
                    if (data === 'Success') {
                        window.location.href = 'http://localhost/TW/EazyJobs/Admin.html';
                    } else {
                        console.error('Unexpected response:', data);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } else {
                fetch('http://localhost/TW/EazyJobs/api/annunci/insertNew.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    // Handle success or failure message from PHP
                    if (data === 'Success') {
                        window.location.href = 'http://localhost/TW/EazyJobs/Admin.html';
                    } else {
                        console.error('Unexpected response:', data);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const annuncioId = params.get('id');

    if (annuncioId) {
        // Fetch annuncio data using the ID
        fetch('http://localhost/TW/EazyJobs/api/annunci/getById.php', {
            method: 'POST',
            body: JSON.stringify(annuncioId)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Populate the form fields with the retrieved data
            document.getElementById('titolo').value = data.titolo;
            document.getElementById('desc_breve').value = data.desc_breve;
            document.getElementById('desc_completa').value = data.desc_completa;
            document.getElementById('locazione').value = data.locazione;
            document.getElementById('settore').value = data.settore;

            const remoto = data.remoto === 1;
            const presenza = data.presenza === 1;
            document.getElementById('modalità-remoto').checked = remoto;
            document.getElementById('modalità-presenza').checked = presenza;

            const determinato = data.contratto === "Tempo determinato";
            document.getElementById('determinato').checked = determinato;
            document.getElementById('indeterminato').checked = !determinato;

            document.getElementById('livello_istruzione').value = data.livello_istruzione;
            document.getElementById('esperienza').value = data.esperienza;
            document.getElementById('stipendio').value = data.stipendio;  

        })
        .catch(error => {
            console.error('Error fetching Annuncio data:', error);
        });
    }
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                PUBBLICA_ANNUNCIO JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
