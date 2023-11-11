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

document.addEventListener("DOMContentLoaded", function() {
    const filterButton = document.getElementById("bottone-filtri");
    const jobFilters = document.getElementById("jobFilters");
    const annunciButton = document.getElementById("bottone-annunci");

    filterButton.addEventListener("click", function() {
        if (jobFilters.style.display === "none" || jobFilters.style.display === "") {
            jobFilters.style.display = "block";
            filterButton.textContent = "Nascondi filtri";
        } else {
            jobFilters.style.display = "none";
            filterButton.textContent = "Mostra filtri";
        }
    });

    annunciButton.addEventListener("click", function() {
        // Hide the filters when annunci are shown
        jobFilters.style.display = "none";
        filterButton.textContent = "Mostra filtri";
    });

    const annuncioLinks = document.querySelectorAll(".annuncio-link");
    const annunciCompleto = document.getElementById("annuncio-completo");

    annuncioLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const target = link.getAttribute("data-target");
            const annuncioCompleto = document.getElementById(target);
            const computedStyle = window.getComputedStyle(annuncioCompleto);
            const filterComputedStyle = window.getComputedStyle(jobFilters);

            // Hide the smaller annuncio [only if annuncio-completo is not already present on screen]
            if (computedStyle.display === "none") {
                // Hide all small annunci
                const smallAnnunci = document.querySelectorAll(".annunci li");
                smallAnnunci.forEach(function(annuncio) {
                    annuncio.style.display = "none";
                });

                filterButton.style.display = "none";
                annuncioCompleto.style.display = "block";
            } else {
                /* Refresh the displayed annuncio */
            }

            // Check conditions to click the filter button
            if (filterComputedStyle.display !== "none" && filterButton.textContent === "Nascondi filtri") {
                filterButton.click();
            }
        });
    });

    // "Torna agli annunci" button functionality
    annunciButton.addEventListener("click", function() {
        annunciCompleto.style.display = "none";

        // Show all small annunci
        const smallAnnunci = document.querySelectorAll(".annunci li");
        smallAnnunci.forEach(function(annuncio) {
            annuncio.style.display = "block";
        });
        filterButton.style.display = "inline";
    });
});
