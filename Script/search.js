import { apiUrl } from './config.js';
import { renderCharacters, renderSearchedCharacter } from './get.js'; // Asegúrate de importar renderSearchedCharacter
import { fetchCharacters } from './get.js';

// Buscar personajes por nombre
export async function searchByName() {
    const nameInput = document.getElementById('search-name').value.toLowerCase();

    if (!nameInput) {
        // Si no hay búsqueda de nombre, recargamos todos los personajes
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
            // Si encontramos un personaje, renderizarlo con el botón de regresar
            renderSearchedCharacter(filteredCharacters[0]); // Solo renderizamos el primer personaje encontrado
        } else {
            alert("No se encontró ningún personaje con ese nombre.");
            renderCharacters([]); // Opcional: limpiar los resultados de la búsqueda
        }
    } catch (error) {
        console.error("Error en la búsqueda por nombre:", error);
    }
}

// Buscar personajes por ubicación
export async function searchByLocation() {
    const locationInput = document.getElementById('search-location').value.toLowerCase();

    if (!locationInput) {
        // Si no hay búsqueda de ubicación, recargamos todos los personajes
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
            // Si encontramos un personaje, renderizarlo con el botón de regresar
            renderSearchedCharacter(filteredCharacters[0]); // Solo renderizamos el primer personaje encontrado
        } else {
            alert("No se encontró ningún personaje en esa ubicación.");
            renderCharacters([]); // Opcional: limpiar los resultados de la búsqueda
        }
    } catch (error) {
        console.error("Error en la búsqueda por ubicación:", error);
    }
}



// Asigna las funciones al objeto window para que estén disponibles en el HTML
window.searchByName = searchByName;
window.searchByLocation = searchByLocation;