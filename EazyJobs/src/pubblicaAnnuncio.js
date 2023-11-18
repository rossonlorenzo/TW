document.addEventListener('DOMContentLoaded', function() {
    const pubblicaButton = document.getElementById('pubblicaAnnuncio-bottone');
    const publishForm = document.getElementById('publishJob-form');

    pubblicaButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Fetch form data
        const formData = new FormData(publishForm);

        // Make a POST request to insertNew.php
        fetch('http://localhost:8888/TW/EazyJobs/api/annunci/insertNew.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Handle success (redirect, show success message, etc.)
                window.location.href = 'success.php';
            } else {
                // Handle error (redirect, show error message, etc.)
                window.location.href = 'error.php';
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('Error:', error);
        });
    });
});
