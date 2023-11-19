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
        .catch(error => {
            // Handle network errors
            console.error('Error:', error);
        });
    });
});
