import { apiUrl } from './config.js'; 
import { fetchCharacters } from './get.js'; // Asegurarse de que esté importado correctamente

// Función para editar un personaje
export async function editCharacter(characterId) {
    document.getElementById("titulo").style.display = "none";
    try {
        const response = await fetch(`${apiUrl}/${characterId}`);
        const character = await response.json();

        // Limpiar los detalles del personaje y mostrar solo el formulario de edición
        document.getElementById("characters-container").innerHTML = ""; // Limpiar detalles

        const editHtml = `
        <div id="edit-character">
            <h2>Editar Personaje</h2>
            <label>Nombre de Sailor: <input type="text" id="edit-sailor-name" value="${character["sailor-name"]}"></label>
            <label>Nombre Real: <input type="text" id="edit-real-name" value="${character.name}"></label>
            <label>Ubicación: <input type="text" id="edit-location" value="${character.location}"></label>
            <label>Descripción Corta: <textarea id="edit-short-description">${character["short-description"]}</textarea></label>
            <label>Descripción Larga: <textarea id="edit-long-description">${character.Details["long-description"]}</textarea></label>
            <label>URL de Imagen: <input type="text" id="edit-sailor-img" value="${character.Details.SailorImg}"></label>
            <button onclick="saveCharacter('${character.id}')">Guardar Cambios</button>
            <button onclick="goBack()">Cancelar</button>
        </div>
        `;

        // Mostrar el formulario de edición
        const editContainer = document.getElementById("edit-container");
        editContainer.innerHTML = editHtml;
        editContainer.style.display = "block"; // Asegúrate de que el contenedor esté visible
    } catch (error) {
        console.error("Error al obtener los detalles del personaje para editar:", error);
        alert("Hubo un error al cargar los detalles del personaje para editar.");
    }
}

// Función para guardar los cambios realizados a un personaje
export async function saveCharacter(characterId) {
    const updatedCharacter = {
        "sailor-name": document.getElementById("edit-sailor-name").value.trim(),
        name: document.getElementById("edit-real-name").value.trim(),
        location: document.getElementById("edit-location").value.trim(),
        "short-description": document.getElementById("edit-short-description").value.trim(),
        Details: {
            "SailorImg": document.getElementById("edit-sailor-img").value.trim(),
            "long-description": document.getElementById("edit-long-description").value.trim(),
        }
    };

    // Verificar que todos los campos estén completos
    if (!updatedCharacter["sailor-name"] || !updatedCharacter.name || !updatedCharacter.location || 
        !updatedCharacter["short-description"] || !updatedCharacter.Details["SailorImg"] || !updatedCharacter.Details["long-description"]) {
        alert("Por favor, completa todos los campos y asegúrate de que la URL de la imagen sea válida.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${characterId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCharacter)
        });

        if (response.ok) {
            goBack();
        } else {
            alert("Error al actualizar el personaje.");
        }
    } catch (error) {
        console.error("Error al guardar los cambios del personaje:", error);
        alert("Hubo un problema al intentar guardar los cambios.");
    }
}
window.editCharacter = editCharacter; 