import { apiUrl } from "./config.js";
import { editCharacter } from "./put.js";
import { deleteCharacter } from './delete.js';
import { showDeleteModal } from "./delete.js";

export let allCharacters = [];

// Función para obtener y renderizar los personajes
export async function fetchCharacters() {
  // Limpiar y ocultar el formulario de edición antes de cargar los personajes
  document.getElementById("edit-container").innerHTML = "";
  document.getElementById("edit-container").style.display = "none";

  try {
      const response = await fetch(apiUrl);
      allCharacters = await response.json(); // Guardar todos los personajes
      renderCharacters(allCharacters); // Mostrar todos los personajes

      // Ocultar el botón de regresar a la búsqueda al mostrar todos los personajes
      document.getElementById('backButton').style.display = 'none';
  } catch (error) {
      console.error("Error al obtener personajes:", error);
  }
}

// Función para renderizar los personajes en cards
export function renderCharacters(characters) {
  const container = document.getElementById("characters-container");
  container.innerHTML = "";

  if (characters.length === 0) {
      container.innerHTML = "";
      return;
  }

  characters.forEach((character) => {
      const card = document.createElement("div");
      card.className = "character-card";
      card.innerHTML = `
          <img src="${character.Details.SailorImg}" alt="${character["sailor-name"]}">
          <h3>${character["sailor-name"]} (${character.name})</h3>
          <p>Ubicación: ${character.location}</p>
          <p>${character["short-description"]}</p>
          <button class="details-button" onclick="viewDetails('${character.id}')">Ver Detalles</button>
      `;
      container.appendChild(card);
  });
}

  export function renderSearchedCharacter(character) {
    const container = document.getElementById("characters-container");
    container.classList.remove("characters-list"); // Eliminar la clase de cuadrícula (si la tenía)
    container.innerHTML = `  
      <div class="character-card">
        <img src="${character.Details.SailorImg}" alt="${character["sailor-name"]}">
        <h3>${character["sailor-name"]} (${character.name})</h3>
        <p>Ubicación: ${character.location}</p>
        <p>${character["short-description"]}</p>
        <button onclick="viewDetails('${character.id}')">Ver Detalles</button>
        
      </div>
    `;
  }

  // Función para regresar a la búsqueda
function goBackToSearch() {
    const container = document.getElementById("characters-container");
    container.classList.add("characters-list"); // Restaurar la vista en cuadrícula
    container.innerHTML = ""; // Limpiar el contenedor
  
    // Limpiar ambos campos de búsqueda
    const searchName = document.getElementById("search-name");
    const searchLocation = document.getElementById("search-location");

    if (searchName) searchName.value = ""; // Limpiar el campo de búsqueda por nombre
    if (searchLocation) searchLocation.value = ""; // Limpiar el campo de búsqueda por ubicación

    // Recargar todos los personajes
    fetchCharacters();
  }

// Nueva función para mostrar detalles del personaje
export async function viewDetails(characterId) {
  try {
    const response = await fetch(`${apiUrl}/${characterId}`);
    const character = await response.json();

    // Crear HTML para los detalles del personaje
    const detailsHtml = `
            <div id="character-details" class="character-details">
                <h2>Detalles del Personaje</h2>
                <img src="${character.Details.SailorImg}" alt="${character["sailor-name"]}">
                <h3>${character["sailor-name"]} (${character.name})</h3>
                <p>Ubicación: ${character.location}</p>
                <p>${character["short-description"]}</p>
                <p><strong>Descripción Larga:</strong></p>
                <p>${character.Details["long-description"]}</p>
                <button onclick="editCharacter('${character.id}')">Editar</button>
                 <button onclick="showDeleteModal('${character.id}')">Eliminar</button> <!-- Aquí mostramos el modal -->
                <button onclick="goBack()">Regresar</button>
            </div>
        `;

        // Reemplazar el contenido del contenedor de personajes con el modo detalles
        const container = document.getElementById("characters-container");
        container.classList.remove("characters-list"); // Eliminar la clase de cuadrícula
        container.innerHTML = detailsHtml; // Insertar HTML de detalles
      } catch (error) {
        console.error("Error al obtener detalles del personaje:", error);
      }
}

// Función para regresar a la lista principal de personajes
function goBack() {
  const container = document.getElementById("characters-container");
  container.classList.add("characters-list"); // Restaurar la clase de cuadrícula
  container.innerHTML = "";
  fetchCharacters(); // Vuelve a cargar la lista de personajes
}



// Tengo q asignar funciones al objeto window para que estén disponibles globalmente
window.fetchCharacters = fetchCharacters;
window.viewDetails = viewDetails;
window.goBack = goBack;
window.goBackToSearch = goBackToSearch;



// Llamar a la función para obtener y mostrar personajes al cargar la página
fetchCharacters();
