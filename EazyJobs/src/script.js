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
            if (data === 'Annuncio aggiunto ai preferiti') {
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