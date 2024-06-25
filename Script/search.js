// search.js

const searchSailors = () => {
    const searchBy = document.getElementById("search-by").value;
    const locationSearch = document.getElementById("location-search").value;
    const sailorSearch = document.getElementById("Sailors-search").value;
    const cardContainer = document.querySelector('.card-container');
    const renderSpinner = document.getElementById("render-spinner");

 
    renderSpinner.style.display = "block";

  
    const url = `https://665a1291de346625136ef9a5.mockapi.io/API/Sailors`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderSpinner.style.display = "none";

            // Filtrar los resultados según los criterios de búsqueda
            let filteredData = data;

            if (searchBy === "Location" && locationSearch !== "Location") {
                filteredData = filteredData.filter(sailor => sailor.location === locationSearch);
            }
            if (searchBy === "Sailors" && sailorSearch !== "Sailors") {
                filteredData = filteredData.filter(sailor => sailor['sailor-name'] === sailorSearch);
            }

            // Limpiar contenedor de tarjetas
            cardContainer.innerHTML = "";

            // Renderizar resultados
            if (filteredData.length > 0) {
                filteredData.forEach(sailor => {
                    const sailorCard = document.createElement("div");
                    sailorCard.classList.add("sailor-card");
                    sailorCard.innerHTML = `
                        <h2>${sailor['sailor-name']}</h2>
                        <p>${sailor['short-description']}</p>
                        <p>Location: ${sailor.location}</p>
                        <img src="${sailor.Details.SailorImg}" alt="${sailor['sailor-name']}" />
                    `;
                    cardContainer.appendChild(sailorCard);
                });
            } else {
                cardContainer.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching sailors:", error);
            renderSpinner.style.display = "none"; // Ocultar el spinner de carga en caso de error
            cardContainer.innerHTML = "<p>Error fetching sailors. Please try again later.</p>";
        });
};

const btnSearch = document.getElementById("btn-search");
btnSearch.addEventListener("click", searchSailors);