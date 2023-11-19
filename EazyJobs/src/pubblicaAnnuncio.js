document.addEventListener('DOMContentLoaded', function() {
    const pubblicaButton = document.getElementById('pubblicaAnnuncio-bottone');
    const publishForm = document.getElementById('publishJob-form');

    pubblicaButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Fetch form data
        const formData = new FormData(publishForm);

        // Make a POST request to insertNew.php
        fetch('http://localhost/TW/EazyJobs/api/annunci/insertNew.php', {
            method: 'POST',
            body: formData
        })
        .then(data => {
            // Handle success or failure message from PHP
            if (data === 'Success') {
                alert("Il tuo Annuncio e' stato pubblicato!");
            } else if (data === 'Failure') {
                alert("Si e' verificato un errore. Riprova!");
            } else {
                console.error('Unexpected response:', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
