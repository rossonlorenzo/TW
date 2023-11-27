var req1;

// annunci population
const annunciSection = document.getElementById('annunci-list');
req1 = new XMLHttpRequest();
req1.open("GET", 'http://localhost/TW/EazyJobs/api/annunci/getAllbyId.php', true);
req1.send();

req1.onload = function () {
    var json = JSON.parse(req1.responseText);
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
                "<img src='./assets/SyncLab-logo.png' alt='SyncLab-logo'>" +
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
    annunciSection.innerHTML += html;
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

var req2;

//recensioni population
const recensioniSection = document.getElementById('recensioni');
req2 = new XMLHttpRequest();
req2.open("GET", 'http://localhost/TW/EazyJobs/api/valutazioni/getall_byAziendaId.php', true);
req2.send();

req2.onload = function () {
    var json = JSON.parse(req2.responseText);
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
    recensioniSection.innerHTML += html;
}