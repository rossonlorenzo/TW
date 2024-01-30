/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                HOME JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
const starRatingElements = document.querySelectorAll(".valutazione-media");

starRatingElements.forEach(function (starRating) {
    const rating = parseFloat(starRating.getAttribute("data-rating"));
    starRating.setAttribute("style", `--rating: ${rating}`);
    let stars = "";

    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += "★";
        } else {
            stars += "☆";
        }
    }
    starRating.setAttribute("data-content", stars);
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                HOME JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ANNUNCI JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {

    const listaAnnunci = document.getElementById("annunci-listaAnnunci");

    if (document.title == "EazyJobs: Annunci") {
        if (window.innerWidth <= 768) {
            const annuncioCompletoIniziale = document.querySelector(".annuncio-completo");
            annuncioCompletoIniziale.setAttribute("class", "annuncio-completo hidden");
        }
    }

    const showDetailsButtons = document.querySelectorAll(".bottone-dettagli");
    const dettagliList = document.querySelectorAll(".dettagli");

    showDetailsButtons.forEach(function (showDetailsButton, index) {
        showDetailsButton.addEventListener("click", () => {
            const dettagli = dettagliList[index];

            if (dettagli.style.display === "none" || dettagli.style.display === "") {
                dettagli.style.display = "block";
                showDetailsButton.value = "Nascondi dettagli";
            } else {
                dettagli.style.display = "none";
                showDetailsButton.value = "Mostra più dettagli";
            }
        });
    });

    const annunciButtons = document.querySelectorAll(".bottone-annunci");

    annunciButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-target");
            const annuncioCompleto = document.getElementById(target);
            annuncioCompleto.setAttribute("class", "annuncio-completo hidden");
            listaAnnunci.setAttribute("class", "annunci");
            document.getElementById('bottone-filtri').scrollIntoView({ behavior: 'smooth' });
        });
    });

    const annuncioLinks = document.querySelectorAll(".annuncio-link");

    annuncioLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const target = link.getAttribute("data-target");
            const annuncioCompleto = document.getElementById(target);
            const annuncioTrue = document.querySelector(".annuncio-completo:not(.hidden)");
            if (annuncioTrue != null) {
                annuncioTrue.setAttribute("class", "annuncio-completo hidden");
            }
            var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (screenWidth <= 768)
                listaAnnunci.setAttribute("class", "annunci nascosto");
            annuncioCompleto.setAttribute("class", "annuncio-completo");
            annuncioCompleto.scrollIntoView({ behavior: 'smooth' });

            //focus su annuncio-completo (on and off)   
            const visibleAnnuncio = annuncioCompleto.querySelector('.annuncio-completo-contenitore');
            const prevElement = link;
            const buttonElement = annuncioCompleto.querySelector('.bottone-dettagli');

            if (visibleAnnuncio) {
                visibleAnnuncio.focus();
                visibleAnnuncio.addEventListener('focusout', function () {
                    setTimeout(function () {
                        if (document.activeElement !== buttonElement) {
                            prevElement.focus();
                        }
                    }, 0);
                });
            }
        });
    });

    const filterButton = document.getElementById("bottone-filtri");
    const filtriRicerca = document.getElementById("filtri-ricerca");
    var annuncioTrue = null

    if (filterButton) {
        filterButton.addEventListener("click", function () {
            if (filtriRicerca.className === "showing") {
                filtriRicerca.className = "hiding";
                filterButton.className = "hiding";
                filterButton.setAttribute("value", "Mostra filtri");
                if (annuncioTrue != null) {
                    annuncioTrue.setAttribute("class", "annuncio-completo");
                }
            } else {
                filtriRicerca.className = "showing";
                filterButton.className = "showing";
                filterButton.setAttribute("value", "Nascondi filtri");
                annuncioTrue = document.querySelector(".annuncio-completo:not(.hidden)");
                if (annuncioTrue != null) {
                    annuncioTrue.setAttribute("class", "annuncio-completo hidden");
                }
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

const candidatiButtons = document.querySelectorAll(".bottone-candidati");

candidatiButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const annuncioId = button.getAttribute('data-id');
        const data = { id: annuncioId };

        fetch('http://localhost/TW/EazyJobs/api/candidati/insertNew.php', {
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
                if (data == 'Annuncio aggiunto ai candidati') {
                    console.log('Annuncio aggiunto ai candidati');
                } else {
                    console.error('Risposta inaspettata:', data);
                }
            })
            .catch(error => {
                console.error('Errore:', error);
            });
    });
});

const stampaButtons = document.querySelectorAll(".bottone-stampa");

stampaButtons.forEach((button) => {
    button.addEventListener("click", () => {
        annunciHidden = document.querySelectorAll(".annuncio-completo.hidden");
        annunciHidden.forEach(function (annuncioHidden) {
            annuncioHidden.classList.add("print-invisible");
        });
        window.print();
        annunciHidden.forEach(function (annuncioHidden) {
            annuncioHidden.classList.remove("print-invisible");
        });
    });
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ANNUNCI JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                AZIENDE JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    const recensioniForm = document.getElementById('recensioni-form');
    const toggleButton = document.getElementById('bottone-recensioni');

    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            recensioniForm.classList.toggle('visibile');
            recensioniForm.classList.toggle('invisibile');

            const isVisibile = recensioniForm.classList.contains('visibile');
            if (isVisibile) {
                toggleButton.value = 'Nascondi il form';

                //focus sul primo input
                const selectElement = document.getElementById('valutazione');
                if (selectElement) {
                    selectElement.focus();
                }
            } else {
                toggleButton.value = 'Scrivi una recensione';
            }
        });

        const recensioniModificaForm = document.getElementById('recensioni-modifica-form');
        const modificaButton = document.getElementById('modifica-recensione');

        if (modificaButton) {
            modificaButton.addEventListener('click', function () {
                recensioniModificaForm.classList.toggle('visibile');
                recensioniModificaForm.classList.toggle('invisibile');

                toggleButton.classList.toggle('invisibile');

                const isModificaVisibile = recensioniModificaForm.classList.contains('visibile');
                if (isModificaVisibile) {
                    modificaButton.value = 'Cancella modifica';

                    //focus sul primo input
                    const selectElement = document.getElementById('modifica-valutazione');
                    if (selectElement) {
                        selectElement.focus();
                    }
                } else {
                    modificaButton.value = 'Modifica';
                }

                if (recensioniForm.classList.contains('visibile')) { toggleButton.click(); }
            });
        }
    }
});

//Funzione di eliminazione
document.addEventListener('click', function (event) {
    if (event.target.id === 'elimina-recensione') {
        const aziendaId = event.target.getAttribute('data-id');

        //ask for confirmation
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.style.display = 'block';

        const confirmButton = document.getElementById('confirmButton');
        confirmButton.focus();

        confirmButton.onclick = function () {
            const data = { id: aziendaId };
            fetch('./api/valutazioni/delete.php', {
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
        cancelButton.onclick = function () {
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
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('bottone-rimuovi-preferiti')) {
        const annuncioId = event.target.getAttribute('data-id');
        const data = { id: annuncioId };

        // Perform a POST request to delete.php
        fetch('./api/preferiti/delete.php', {
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

    if (event.target.classList.contains('bottone-rimuovi-candidati')) {
        const annuncioId = event.target.getAttribute('data-id');
        const data = { id: annuncioId };

        // Perform a POST request to delete.php
        fetch('./api/candidati/delete.php', {
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
                if (data == 'Annuncio rimosso dai candidati') {
                    console.log('Annuncio rimosso dai candidati');
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

    if (list.classList.contains("hiding")) {
        list.classList.remove("hiding");
        list.classList.add("showing");

        header.classList.remove("hiding");
        header.classList.add("showing");

        changeButton(id);

        setTimeout(() => {
            list.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 250); // Scroll to the section after opening
    } else {
        list.classList.remove("showing");
        list.classList.add("hiding");

        header.classList.remove("showing");
        header.classList.add("hiding");

        changeButton(id);
    }
}


function changeButton(name) {
    var btn = document.getElementsByName(name)[0];
    var span = btn.children[0];
    if (span.className == "toggle hide") {
        span.className = "toggle show";
        btn.setAttribute("aria-expanded", "false");
        if (btn.id == "annunci-toggle") {
            btn.setAttribute("aria-label", "Mostra gli annunci");
        } else { btn.setAttribute("aria-label", "Mostra le recensioni"); }

    } else {
        span.className = "toggle hide";
        btn.setAttribute("aria-expanded", "true");
        if (btn.id == "annunci-toggle") {
            btn.setAttribute("aria-label", "Nascondi gli annunci");
        } else { btn.setAttribute("aria-label", "Nascondi le recensioni"); }
    }
}

function showHideNav() {
    var btn = document.querySelector('button.hamburger');
    var span = btn.children[0];
    if (span.className == "burger open") {
        span.className = "burger close";
        btn.setAttribute("aria-expanded", "true");

    } else {
        span.className = "burger open";
        btn.setAttribute("aria-expanded", "false");
    }

    var nav = document.getElementById("menu");
    if (nav.className == "hiding") {
        nav.className = "showing";
    } else {
        nav.className = "hiding";
    }

}

function hideAll(role) {
    showHideCards(role + "-preferitiLista");
    if (role == "user") {
        showHideCards(role + "-candidatiLista");
    }
    showHideCards(role + "-recensioni");
    showHideNav();
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                USER JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/



/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ADMIN JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/

//vedi - chiudi candidati

    const vediCandidatiButtons = document.querySelectorAll(".bottone-vedi-candidati");

    vediCandidatiButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const candidatiShowing = document.querySelectorAll('[class^="candidato-annuncio-"]:not(.hidden)');
            if(candidatiShowing.length === 0){
            const annuncioId = button.getAttribute('data-id');
            const candidati = document.querySelectorAll(".candidato-annuncio-" + annuncioId);

            var element = document.getElementById('admin-candidatiLista-header-hidden');
            var currentId = element.getAttribute('id');
            var newId = currentId.replace('-hidden', '');
            element.setAttribute('id', newId);
            document.getElementById("admin-candidatiLista-header").classList.remove("hiding");

            candidati.forEach((candidato) => {
                candidato.classList.remove("hidden");
            });
        }else{
            console.log("Chiudi prima la sezione candidati")
        }
        });
    });

    const candidatiChiudi =document.getElementById("chiudi-candidati");

    if(candidatiChiudi){
    candidatiChiudi.addEventListener("click", function () {
    const candidatiShowing = document.querySelectorAll('[class^="candidato-annuncio-"]:not(.hidden)');
    candidatiShowing.forEach((candidato) => {
        candidato.classList.add("hidden");
    });

    document.getElementById("admin-candidatiLista-header").classList.add("hiding");
    var element = document.getElementById('admin-candidatiLista-header');
            var currentId = element.getAttribute('id');
            currentId += "-hidden";
            element.setAttribute('id', currentId);

})};



//Funzione di modifica
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('bottone-modifica')) {
        const annuncioId = event.target.getAttribute('data-id');
        const data = { id: annuncioId };
        const formData = new URLSearchParams(data).toString();
        window.location.href = `./ModificaAnnuncio.php?${formData}`;
    }
});


//Funzione di eliminazione
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('bottone-elimina')) {
        const annuncioId = event.target.getAttribute('data-id');

        //ask for confirmation
        const confirmationModal = document.getElementById('confirmationModal');
        confirmationModal.style.display = 'block';

        const confirmButton = document.getElementById('confirmButton');
        confirmButton.focus();

        confirmButton.onclick = function () {
            const data = { id: annuncioId };
            fetch('./api/annunci/delete.php', {
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
        cancelButton.onclick = function () {
            console.log('Cancellazione annullata.');
            confirmationModal.style.display = 'none';
        };
    };
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                ADMIN JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
//validazione dei form
const fieldValidation = {
    nome: { check: /^(?=.{1,60}$)[a-zA-Z\u00C0-\u00FF']+(\s[a-zA-Z\u00C0-\u00FF']+)?$/, error: 'Inserire un nome valido' },
    email: { check: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, error: 'Inserire un\'email valida' },
    password: { check: /^.{8,12}$/, error: 'Inserire una password valida (8-12 caratteri)' },
    cv: { check: /\.(pdf)$/i, error: 'Inserire un cv valido (formato PDF)' },
    commento: { check: /^.{0,300}$/, error: 'Inserire un commento valido (0-300 caratteri)' },
    titolo: { check: /^(?=.{1,60}$)[a-zA-Z\u00C0-\u00FF']+(\s[a-zA-Z\u00C0-\u00FF']+)?$/, error: 'Inserire un titolo valido' },
    desc_breve: { check: /^.{50,200}$/, error: 'Inserire una descrizione breve valida (50-200 caratteri)' },
    desc_completa: { check: /^.{100,500}$/, error: 'Inserire una descrizione completa valida (100-500 caratteri)' },
    locazione: { check: /^(?=.{1,60}$)[a-zA-Z\u00C0-\u00FF']+(\s[a-zA-Z\u00C0-\u00FF']+)?$/, error: 'Inserire una provincia valida' },
    settore: { check: /^(?=.{1,60}$)[a-zA-Z\u00C0-\u00FF']+(\s[a-zA-Z\u00C0-\u00FF']+){0,2}$/, error: 'Inserire un settore valido' },
    stipendio: { check: /^\d+$/, error: 'Inserire uno stipendio valido' },
    logo: { check: /\.png$/i, error: 'Inserire un logo valido (formato PNG)' },
    sito: { check: /^(ftp|http|https):\/\/[^ "]+$/, error: 'Inserire un sito valido' },
    dipendenti: { check: /^\d+$/, error: 'Inserire un numero di dipendenti valido' },
    fatturato: { check: /^\d+$/, error: 'Inserire un fatturato valido' },
};

function validateRegex(field) {
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
        return false;
    } else {
        element.classList.remove('errore');
        error.innerHTML = '';
        element.removeAttribute("aria-invalid");
        element.removeAttribute("aria-describedby");
        element.removeAttribute("aria-live");
    }
    return true;
}

function validateCheckbox(formElement, field) {
    const checkboxGroup = document.querySelector('.checkbox-group');
    const checkboxes = formElement.querySelectorAll('input[type="checkbox"]');
    const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    if (!isChecked) {
        checkboxGroup.classList.add('errore');
        checkboxGroup.setAttribute("aria-invalid", "true");
        checkboxGroup.setAttribute("aria-describedby", "checkbox-errore");
        checkboxGroup.setAttribute("aria-live", "assertive");
        return false;
    } else {
        checkboxGroup.classList.remove('errore');
        checkboxGroup.removeAttribute("aria-invalid");
        checkboxGroup.removeAttribute("aria-describedby");
        checkboxGroup.removeAttribute("aria-live");
    }
    return true;
}

function validateRadio(formElement, field) {
    const radioGroup = document.querySelector('.radio-group');
    const radioButtons = formElement.querySelectorAll('input[type="radio"]');
    const isAnyChecked = Array.from(radioButtons).some(radio => radio.checked);

    if (!isAnyChecked) {
        radioGroup.classList.add('errore');
        radioGroup.setAttribute("aria-invalid", "true");
        radioGroup.setAttribute("aria-live", "assertive");
        radioGroup.setAttribute("aria-describedby", "radio-group-errore");
        return false;
    } else {
        radioGroup.classList.remove('errore');
        radioGroup.removeAttribute("aria-invalid");
        radioGroup.removeAttribute("aria-live");
        radioGroup.removeAttribute("aria-describedby");
    }
    return true;
}

function validateYear(field) {
    const element = document.getElementById(field.name);
    const error = document.getElementById(field.name + '-errore');
    var currentYear = new Date().getFullYear();

    if (isNaN(field.value) || field.value < 1800 || field.value > currentYear) {
        element.classList.add('errore');
        error.innerHTML = 'Inserire un anno valido';
        element.setAttribute("aria-invalid", "true");
        element.setAttribute("aria-describedby", field.name + '-errore');
        element.setAttribute("aria-live", "assertive");
        return false;
    } else {
        element.classList.remove('errore');
        error.innerHTML = '';
        element.removeAttribute("aria-invalid");
        element.removeAttribute("aria-describedby");
        element.removeAttribute("aria-live");
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');

    function validateField(form, field) {
        if (field.name in fieldValidation) {
            return validateRegex(field);

        } else if (field.type == 'checkbox') {
            return validateCheckbox(form, field);

        } else if (field.type == 'radio') {
            return validateRadio(form, field);

        } else if (field.type == 'number') {
            return validateYear(field);
        }
    }

    function handleFieldInteraction(event) {
        const field = event.target;
        const form = field.closest('form');

        if (form && (field.tagName == 'INPUT' || field.tagName == 'TEXTAREA' || field.tagName == 'SELECT')) {
            validateField(form, field);
        } else if (form && (field.type == 'checkbox' || field.type == 'radio')) {
            validateField(form, field);
        }
    }

    forms.forEach(function (form) {
        if (form.id != "filtri-ricerca") {
            form.addEventListener('input', handleFieldInteraction);
            form.addEventListener('change', handleFieldInteraction);
        }
    });
});


document.addEventListener('click', function (event) {
    const target = event.target;
    if (target.dataset.validation === 'validateFields') {
        const formElement = target.closest('form');
        if (formElement && formElement.id === 'login-form') {
            const emailInput = formElement.querySelector('#email');
            const passwordInput = formElement.querySelector('#password');
            if (
                (emailInput.value.toLowerCase() === 'user' && passwordInput.value === 'user') ||
                (emailInput.value.toLowerCase() === 'admin' && passwordInput.value === 'admin')
            ) {
                formElement.submit();
            }
        }
        if (formElement) {
            const isValid = validateForm(formElement);
            if (!isValid) {
                event.preventDefault();
            }
        }
    }
});

function validateForm(formElement) {
    const fields = formElement.elements;
    let flag = true;

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];

        if (field.name in fieldValidation) {
            if (!validateRegex(field)) { flag = false; }
        } else if (field.type == 'checkbox') {
            if (!validateCheckbox(formElement, field)) { flag = false; }
        } else if (field.type == 'radio') {
            if (!validateRadio(formElement, field)) { flag = false; }
        } else if (field.type == 'number') {
            if (!validateYear(field)) { flag = false; }
        }
    }

    return flag;
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                MODIFICA_ANNUNCIO JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const mod = document.getElementById("disabled-modificaAnnuncio-bottone");

    const contenuti = document.getElementById("contenuti");
    const caratteristiche = document.getElementById("caratteristiche");
    const requisiti = document.getElementById("requisiti");

    function setFocusToFirstInput(section) {
        const firstInput = section.querySelector('input, textarea, select');
        if (firstInput) {
            firstInput.focus();
        }
    }

if (prev) {
    prev.addEventListener("click", () => {
        if(contenuti && contenuti.getAttribute("class") === "visible-fieldset"){
            return;
        }
        if(caratteristiche && caratteristiche.getAttribute("class") === "visible-fieldset"){
            contenuti.setAttribute("class", "visible-fieldset");
            caratteristiche.setAttribute("class","hidden-fieldset");
            setFocusToFirstInput(contenuti);
        }
        if(requisiti && requisiti.getAttribute("class") === "visible-fieldset"){
            caratteristiche.setAttribute("class", "visible-fieldset");
            requisiti.setAttribute("class","hidden-fieldset");
            mod.setAttribute("id","disabled-modificaAnnuncio-bottone");
            mod.disabled = true;
            setFocusToFirstInput(caratteristiche);
        }
    })
}

    if (next) {
        next.addEventListener("click", () => {
            if(requisiti && requisiti.getAttribute("class") === "visible-fieldset"){
                return;
            }
            if(caratteristiche && caratteristiche.getAttribute("class") === "visible-fieldset"){
                mod.setAttribute("id","modificaAnnuncio-bottone");
                mod.removeAttribute("disabled")
                requisiti.setAttribute("class", "visible-fieldset");
                caratteristiche.setAttribute("class", "hidden-fieldset");
                setFocusToFirstInput(requisiti);
            }
            if(contenuti && contenuti.getAttribute("class") === "visible-fieldset"){
                caratteristiche.setAttribute("class", "visible-fieldset");
                contenuti.setAttribute("class", "hidden-fieldset");
                setFocusToFirstInput(caratteristiche);
            }
        })
    }
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                MODIFICA_ADMIN JS [INZIO]

--------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const mod = document.getElementById("disabled-modificaAdmin-bottone");

    const credenziali = document.getElementById("credenziali");
    const dettagli = document.getElementById("dettagli");
    const dati = document.getElementById("dati");

    function setFocusToFirstInput(section) {
        const firstInput = section.querySelector('input, textarea, select');
        if (firstInput) {
            firstInput.focus();
        }
    }

    if (prev) {
        prev.addEventListener("click", () => {
            if(credenziali && credenziali.getAttribute("class") === "visible-fieldset"){
                return;
            }
            if(dettagli && dettagli.getAttribute("class") === "visible-fieldset"){
                credenziali.setAttribute("class", "visible-fieldset");
                dettagli.setAttribute("class", "hidden-fieldset");
                setFocusToFirstInput(credenziali);
            }
            if(dati && dati.getAttribute("class") === "visible-fieldset"){
                dettagli.setAttribute("class", "visible-fieldset");
                dati.setAttribute("class","hidden-fieldset");
                mod.setAttribute("id","disabled-modificaAnnuncio-bottone");
                mod.disabled = true;
                setFocusToFirstInput(dettagli);
            }
        })
    }

    if (next) {
        next.addEventListener("click", () => {
            if(dati && dati.getAttribute("class") === "visible-fieldset"){
                return;
            }
            if(dettagli && dettagli.getAttribute("class") === "visible-fieldset"){
                mod.setAttribute("id","modificaAnnuncio-bottone");
                mod.removeAttribute("disabled")
                dati.setAttribute("class", "visible-fieldset");
                dettagli.setAttribute("class", "hidden-fieldset");
                setFocusToFirstInput(dati);
            }
            if(credenziali && credenziali.getAttribute("class") === "visible-fieldset"){
                dettagli.setAttribute("class", "visible-fieldset");
                credenziali.setAttribute("class", "hidden-fieldset");
                setFocusToFirstInput(dettagli);
            }
        })
    }
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------
                                                            
                                                                MODIFICA_ADMIN JS [FINE]

--------------------------------------------------------------------------------------------------------------------------------------------------*/