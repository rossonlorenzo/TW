/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                HOME JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
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
                    "<li><h5>Contatti:</h5><p>" + val.email + "</p></li>" +
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
            "<li><h5>Contatti:</h5><p>s" + data.email + "</p></li>" +
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
                                                            
                                                                AZIENDE JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    const recensioniForm = document.getElementById('recensioni-form');
    const toggleButton = document.getElementById('bottone-recensioni');

    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            recensioniForm.classList.toggle('visibile');
            recensioniForm.classList.toggle('invisibile');
    
            const isVisibile = recensioniForm.classList.contains('visibile');
            if (isVisibile) {
                toggleButton.textContent = 'Nascondi il form';
            } else {
                toggleButton.textContent = 'Scrivi una recensione';
            }
        });
    
        const recensioniModificaForm = document.getElementById('recensioni-modifica-form');
        const modificaButton = document.getElementById('modifica-recensione');
    
        modificaButton.addEventListener('click', function() {
            recensioniModificaForm.classList.toggle('visibile');
            recensioniModificaForm.classList.toggle('invisibile');
    
            toggleButton.classList.toggle('invisibile');
    
            const isModificaVisibile = recensioniModificaForm.classList.contains('visibile');
            if (isModificaVisibile) {
                modificaButton.textContent = 'Cancella modifica';
            } else {
                modificaButton.textContent = 'Modifica';
            }
    
            if (recensioniForm.classList.contains('visibile')) {toggleButton.click();}
        });
    }
});

//Funzione di eliminazione
document.addEventListener('click', function(event) {
    if (event.target.id === 'elimina-recensione') {
        const aziendaId = event.target.getAttribute('data-id');

        //ask for confirmation
        const confirmation = confirm('Sei sicuro di voler eliminare questa recensione?');     //replace with a custom div

        if (confirmation) {
            const data = { id: aziendaId };
            fetch('http://localhost/TW/EazyJobs/api/valutazioni/delete.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.text();
            })
            .then(data => {
                // Handle success or failure message from PHP
                if (data === 'Recensione rimossa') {
                    console.log('Recensione rimossa');
                    const deletedItem = document.getElementById("recensione-utente");
                    if (deletedItem) {
                        deletedItem.remove();
                    } else {
                        console.error('Elemento non trovato');
    }
                } else {
                    console.error('Risposta inaspettata:', data);
                }
            })
            .catch(error => {
                console.error('Errore:', error);
            });
        }
        else {
            console.log('Deletion was cancelled.');
        }
    };
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                AZIENDE JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                USER JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
//Funzione di rimozione dai preferiti
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('bottone-rimuovi-preferiti')) {
        const annuncioId = event.target.getAttribute('data-id');
        const data = { id: annuncioId };

        // Perform a POST request to delete.php
        fetch('http://localhost/TW/EazyJobs/api/preferiti/delete.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            // Handle success or failure message from PHP
            if (data === 'Annuncio rimosso dai preferiti') {
                console.log('Annuncio rimosso dai preferiti');
                const deletedItem = document.getElementById("annuncio-" + annuncioId);
                if (deletedItem) {
                    deletedItem.remove();
                } else {
                    console.error('Elemento non trovato');
                }
            } else {
                console.error('Risposta inaspettata:', data);
            }
        })
        .catch(error => {
            console.error('Errore:', error);
        });
    }
});

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
//Funzione di modifica
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('bottone-modifica')) {
        const annuncioId = event.target.getAttribute('data-id');
        const data = { id: annuncioId };
        const formData = new URLSearchParams(data).toString();
        window.location.href = `http://localhost/TW/EazyJobs/ModificaAnnuncio.php?${formData}`;
    }
});   

//Funzione di eliminazione
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('bottone-elimina')) {
        const annuncioId = event.target.getAttribute('data-id');

        //ask for confirmation
        const confirmation = confirm('Sei sicuro di voler eliminare questo annuncio?');     //replace with a custom div

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
                if (data === 'Annuncio rimosso') {
                    console.log('Annuncio rimosso');
                    const deletedItem = document.getElementById("annuncio-" + annuncioId);
                    if (deletedItem) {
                        deletedItem.remove();
                    } else {
                        console.error('Elemento non trovato');
    }
                } else {
                    console.error('Risposta inaspettata:', data);
                }
            })
            .catch(error => {
                console.error('Errore:', error);
            });
        }
        else {
            console.log('Deletion was cancelled.');
        }
    };
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ADMIN JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
//validazione dei form
document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.dataset.validation === 'validateFields') {
        const formElement = target.closest('form');
        if (formElement) {
            const isValid = validateForm(formElement);

            if (!isValid) {
                event.preventDefault();
            }
        }
    }
});

//aggiungere lunghezze
const fieldValidation = {
    nome: {check: /^[a-zA-Z\u00C0-\u00FF'][a-zA-Z\s\u00C0-\u00FF']$/, error: 'Inserire un nome valido'},
    email: {check: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, error: 'Inserire un\'email valida'},
    password: {check: /^.{8,12}$/, error: 'Inserire una password valida (8-12 caratteri)'},
    cv: {check: /\.(pdf)$/i, error: 'Inserire un cv valido (formato PDF)'},
    commento: {check: /^.{0,300}$/, error: 'Inserire un commento valido (0-300 caratteri)'},
    titolo: {check: /^[a-zA-Z\u00C0-\u00FF'][a-zA-Z\s\u00C0-\u00FF']$/, error: 'Inserire un titolo valido'},
    desc_breve: {check: /^.{50,200}$/, error: 'Inserire una descrizione breve (50-200 caratteri)'},
    desc_completa: {check: /^.{100,500}$/, error: 'Inserire una descrizione completa (100-500 caratteri)'},
    locazione: {check: /^[a-zA-Z\u00C0-\u00FF'][a-zA-Z\s\u00C0-\u00FF']$/, error: 'Inserire una provincia valida'},
    settore: {check: /^[a-zA-Z\u00C0-\u00FF'][a-zA-Z\s\u00C0-\u00FF']$/, error: 'Inserire un settore valido'},
    stipendio: {check:/^\d+$/, error: 'Inserire uno stipendio valido'}
};

function validateForm(formElement) {
    const fields = formElement.elements;
    let flag = true;

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];

        if (field.name in fieldValidation) {
            const validation = fieldValidation[field.name];
            const regex = validation.check;
            const element = document.getElementById(field.name);
            const error = document.getElementById(field.name + '-errore');

            if (!regex.test(field.value)) {
                element.classList.add('errore');
                error.innerHTML = validation.error;
                flag = false;
            } else {
                element.classList.remove('errore');
                error.innerHTML = '';
            }
        } else if (field.type == 'checkbox') {
            const checkboxGroup = document.querySelector('.checkbox-group');
            const checkboxes = formElement.querySelectorAll('input[type="checkbox"]');
            const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

            if (!isChecked) {
                flag = false;
                checkboxGroup.classList.add('errore');
            } else {
                checkboxGroup.classList.remove('errore');
            }
        } else if (field.type == 'radio') {
            const radioGroup = document.querySelector('.radio-group');
            const radioButtons = formElement.querySelectorAll('input[type="radio"]');
            const isAnyChecked = Array.from(radioButtons).some(radio => radio.checked);

            if (!isAnyChecked) {
                flag = false;
                radioGroup.classList.add('errore');
            } else {
                radioGroup.classList.remove('errore');
            }
        }
    }

    return flag;
}