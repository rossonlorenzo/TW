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
document.addEventListener("DOMContentLoaded", function () {

const showDetailsButtons = document.querySelectorAll(".bottone-dettagli");
const dettagliList = document.querySelectorAll(".dettagli");

showDetailsButtons.forEach(function (showDetailsButton, index) {
    showDetailsButton.addEventListener("click", () => {
        const dettagli = dettagliList[index];

        if (dettagli.style.display === "none" || dettagli.style.display === "") {
            dettagli.style.display = "block";
            showDetailsButton.textContent = "Nascondi dettagli";
        } else {
            dettagli.style.display = "none";
            showDetailsButton.textContent = "Mostra più dettagli";
        }
    });
});

const annunciButtons = document.querySelectorAll(".bottone-annunci");

annunciButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const target = button.getAttribute("data-target");
        const annuncioCompleto = document.getElementById(target);
        annuncioCompleto.setAttribute("class", "annuncio-completo-hidden");
        document.getElementById('bottone-filtri').scrollIntoView({ behavior: 'smooth' });
    });
});

const annuncioLinks = document.querySelectorAll(".annuncio-link");
annuncioLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const target = link.getAttribute("data-target");
        const annuncioCompleto = document.getElementById(target);
        const annuncioTrue = document.getElementsByClassName("annuncio-completo")[0];
        if(annuncioTrue!= null)
            document.getElementsByClassName("annuncio-completo")[0].setAttribute("class", "annuncio-completo-hidden");
        annuncioCompleto.setAttribute("class", "annuncio-completo");
        annuncioCompleto.scrollIntoView({ behavior: 'smooth' });
    });
});

    const filterButton = document.getElementById("bottone-filtri");
    const filtriRicerca = document.getElementById("filtri-ricerca");

    if (filterButton) {
        filterButton.addEventListener("click", function () {
            if (filtriRicerca.style.display === "none" || filtriRicerca.style.display === "") {
                filtriRicerca.style.display = "block";
                filterButton.textContent = "Nascondi filtri";
            } else {
                filtriRicerca.style.display = "none";
                filterButton.textContent = "Mostra filtri";
            }
        });
    }
});

const salvaButtons = document.querySelectorAll(".bottone-salva");

salvaButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const annuncioId = button.getAttribute('data-id');
        const data = { id: annuncioId };

        fetch('http://localhost/TW/EazyJobs/api/preferiti/insertNew.php', {
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
            if (data == 'Annuncio aggiunto ai preferiti') {
                console.log('Annuncio aggiunto ai preferiti');
            } else {
                console.error('Risposta inaspettata:', data);
            }
        })
        .catch(error => {
            console.error('Errore:', error);
        });
    });
});


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
    
        if (modificaButton) {
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
    }
});

//Funzione di eliminazione
document.addEventListener('click', function(event) {
    if (event.target.id === 'elimina-recensione') {
        const aziendaId = event.target.getAttribute('data-id');

        //ask for confirmation
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.style.display = 'block';

        const confirmButton = document.getElementById('confirmButton');
        confirmButton.onclick = function() {
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
                confirmationModal.style.display = 'none';
            })
            .catch(error => {
                console.error('Errore:', error);
                confirmationModal.style.display = 'none';
            });
        }
        const cancelButton = document.getElementById('cancelButton');
        cancelButton.onclick = function() {
            console.log('Cancellazione annullata.');
            confirmationModal.style.display = 'none';
        };
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
            if (data == 'Annuncio rimosso dai preferiti') {
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
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.style.display = 'block';

        const confirmButton = document.getElementById('confirmButton');
        confirmButton.onclick = function() {
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
                confirmationModal.style.display = 'none';
            })
            .catch(error => {
                console.error('Errore:', error);
                confirmationModal.style.display = 'none';
            });
        }
        const cancelButton = document.getElementById('cancelButton');
        cancelButton.onclick = function() {
            console.log('Cancellazione annullata.');
            confirmationModal.style.display = 'none';
        };
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
    nome: {check: /^(?=.{1,60}$)[a-zA-Z\u00C0-\u00FF']+(\s[a-zA-Z\u00C0-\u00FF']+)?$/, error: 'Inserire un nome valido'},
    email: {check: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, error: 'Inserire un\'email valida'},
    password: {check: /^.{8,12}$/, error: 'Inserire una password valida (8-12 caratteri)'},
    cv: {check: /\.(pdf)$/i, error: 'Inserire un cv valido (formato PDF)'},
    commento: {check: /^.{0,300}$/, error: 'Inserire un commento valido (0-300 caratteri)'},
    titolo: {check: /^(?=.{1,60}$)[a-zA-Z\u00C0-\u00FF']+(\s[a-zA-Z\u00C0-\u00FF']+)?$/, error: 'Inserire un titolo valido'},
    desc_breve: {check: /^.{50,200}$/, error: 'Inserire una descrizione breve valida (50-200 caratteri)'},
    desc_completa: {check: /^.{100,500}$/, error: 'Inserire una descrizione completa valida (100-500 caratteri)'},
    locazione: {check: /^(?=.{1,60}$)[a-zA-Z\u00C0-\u00FF']+(\s[a-zA-Z\u00C0-\u00FF']+)?$/, error: 'Inserire una provincia valida'},
    settore: {check: /^(?=.{1,60}$)[a-zA-Z\u00C0-\u00FF']+(\s[a-zA-Z\u00C0-\u00FF']+){0,2}$/, error: 'Inserire un settore valido'},
    stipendio: {check: /^\d+$/, error: 'Inserire uno stipendio valido'},
    logo: {check: /^$|(\.png)$/i, error: 'Inserire un logo valido (formato PNG)'},
    sito: {check: /^(ftp|http|https):\/\/[^ "]+$/, error: 'Inserire un sito valido'},
    dipendenti: {check: /^\d+$/, error: 'Inserire un numero di dipendenti valido'},
    fatturato: {check: /^\d+$/, error: 'Inserire un fatturato valido'},
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
                element.setAttribute("aria-invalid", "true");
                element.setAttribute("aria-describedby", field.name + '-errore');
                element.setAttribute("aria-live", "assertive");
                flag = false;
            } else {
                element.classList.remove('errore');
                error.innerHTML = '';
                element.removeAttribute("aria-invalid");
                element.removeAttribute("aria-describedby");
                element.removeAttribute("aria-live");
            }
        } else if (field.type == 'checkbox') {
            const checkboxGroup = document.querySelector('.checkbox-group');
            const checkboxes = formElement.querySelectorAll('input[type="checkbox"]');
            const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

            if (!isChecked) {
                flag = false;
                checkboxGroup.classList.add('errore');
                checkboxGroup.setAttribute("aria-invalid", "true");
                checkboxGroup.setAttribute("aria-describedby", "checkbox-errore");
                checkboxGroup.setAttribute("aria-live", "assertive");
            } else {
                checkboxGroup.classList.remove('errore');
                checkboxGroup.removeAttribute("aria-invalid");
                checkboxGroup.removeAttribute("aria-describedby");
                checkboxGroup.removeAttribute("aria-live");
            }
        } else if (field.type == 'radio') {
            const radioGroup = document.querySelector('.radio-group');
            const radioButtons = formElement.querySelectorAll('input[type="radio"]');
            const isAnyChecked = Array.from(radioButtons).some(radio => radio.checked);

            if (!isAnyChecked) {
                flag = false;
                radioGroup.classList.add('errore');
                radioGroup.setAttribute("aria-invalid", "true");
                radioGroup.setAttribute("aria-live", "assertive");
                radioGroup.setAttribute("aria-describedby", "radio-group-errore");
            } else {
                radioGroup.classList.remove('errore');
                radioGroup.removeAttribute("aria-invalid");
                radioGroup.removeAttribute("aria-live");
                radioGroup.removeAttribute("aria-describedby");
            }
        } else if (field.type == 'number') {
            const element = document.getElementById(field.name);
            const error = document.getElementById(field.name + '-errore');
            var currentYear = new Date().getFullYear();

            if (isNaN(field.value) || field.value < 1800 || field.value > currentYear) {
                element.classList.add('errore');
                error.innerHTML = 'Inserire un anno valido';
                element.setAttribute("aria-invalid", "true");
                element.setAttribute("aria-describedby", field.name + '-errore');
                element.setAttribute("aria-live", "assertive");
                flag = false;
            } else {
                element.classList.remove('errore');
                error.innerHTML = '';
                element.removeAttribute("aria-invalid");
                element.removeAttribute("aria-describedby");
                element.removeAttribute("aria-live");
            }
        }
    }

    return flag;
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ModicaAnnuncio JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
//Funzione di modifica

document.addEventListener('DOMContentLoaded', function() {
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const mod = document.getElementById("disabled-modificaAnnuncio-bottone");

    const contenuti = document.getElementById("contenuti");
    const caratteristiche = document.getElementById("caratteristiche");
    const requisiti = document.getElementById("requisiti");

    prev.addEventListener("click", () => {
        if(contenuti.getAttribute("class") === "visible-fieldset"){
            return;
        }
        if(caratteristiche.getAttribute("class") === "visible-fieldset"){
            contenuti.setAttribute("class", "visible-fieldset");
            caratteristiche.setAttribute("class","hidden-fieldset");
        }
        if(requisiti.getAttribute("class") === "visible-fieldset"){
            caratteristiche.setAttribute("class", "visible-fieldset");
            requisiti.setAttribute("class","hidden-fieldset");
            mod.setAttribute("id","disabled-modificaAnnuncio-bottone");
            mod.setAttribute("disabled", "true");
        }
    })

    next.addEventListener("click", () => {
        if(requisiti.getAttribute("class") === "visible-fieldset"){
            return;
        }
        if(caratteristiche.getAttribute("class") === "visible-fieldset"){
            mod.setAttribute("id","modificaAnnuncio-bottone");
            mod.removeAttribute("disabled")
            requisiti.setAttribute("class", "visible-fieldset");
            caratteristiche.setAttribute("class","hidden-fieldset");
        }
        if(contenuti.getAttribute("class") === "visible-fieldset"){
            caratteristiche.setAttribute("class", "visible-fieldset");
            contenuti.setAttribute("class","hidden-fieldset");
            caratteristiche.focus();
        }
    })
});