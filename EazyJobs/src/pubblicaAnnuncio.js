document.addEventListener('DOMContentLoaded', function() {
    const pubblicaButton = document.getElementById('pubblicaAnnuncio-bottone');
    const publishForm = document.getElementById('publishJob-form');

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


