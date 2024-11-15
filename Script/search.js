import { apiUrl } from './config.js';
import { renderCharacters, renderSearchedCharacter } from './get.js'; 
import { fetchCharacters } from './get.js';

// Buscar personajes por nombre
export async function searchByName() {
    const nameInput = document.getElementById('search-name').value.toLowerCase();
    const backButton = document.getElementById('backButton');

    if (!nameInput) {
        fetchCharacters();
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const characters = await response.json();

        // Filtrar personajes por nombre
        const filteredCharacters = characters.filter(character =>
            character["sailor-name"].toLowerCase().includes(nameInput)
        );

        if (filteredCharacters.length > 0) {
            renderCharacters(filteredCharacters);
            backButton.style.display = 'block'; // Mostrar el botón si hay resultados
        } else {
            alert("No se encontró ningún personaje con ese nombre.");
            renderCharacters([]);
            backButton.style.display = 'block'; // Ocultar el botón si no hay resultados
        }
    } catch (error) {
        console.error("Error en la búsqueda por nombre:", error);
    }
}

// Buscar personajes por ubicación
export async function searchByLocation() {
    const locationInput = document.getElementById('search-location').value.toLowerCase();
    const backButton = document.getElementById('backButton');

    if (!locationInput) {
        fetchCharacters();
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const characters = await response.json();

        // Filtrar personajes por ubicación
        const filteredCharacters = characters.filter(character =>
            character.location.toLowerCase().includes(locationInput)
        );

        if (filteredCharacters.length > 0) {
            renderCharacters(filteredCharacters);
            backButton.style.display = 'block'; // Mostrar el botón si hay resultados
        } else {
            alert("No se encontró ningún personaje en esa ubicación.");
            renderCharacters([]);
            backButton.style.display = 'none'; // Ocultar el botón si no hay resultados
        }
    } catch (error) {
        console.error("Error en la búsqueda por ubicación:", error);
    }
}

// Debo asignar las funciones al objeto window para que estén disponibles en el HTML
window.searchByName = searchByName;
window.searchByLocation = searchByLocation;