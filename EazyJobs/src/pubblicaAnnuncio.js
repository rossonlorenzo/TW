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
        .then(response => {
            if (response.ok) {
                // Handle success
                console.log('Request successful:', response);
            } else {
                // Handle error
                console.error('Request failed:', response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'error.php';
        });
    });
});
