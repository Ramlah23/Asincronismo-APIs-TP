import { apiUrl } from "./config.js";
import { fetchCharacters } from "./get.js"

// Función para mostrar la modal de confirmación de eliminación
export function showDeleteModal(characterId) {
  const modalHtml = `
    <div id="delete-modal" class="modal-overlay">
      <div class="modal-content">
        <h3>¿Estás seguro de que deseas eliminar este personaje?</h3>
        <button id="confirm-delete" class="modal-btn">Sí</button>
        <button id="cancel-delete" class="modal-btn">No</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Asignar eventos a los botones de la modal
  document.getElementById("confirm-delete").addEventListener("click", () => {
    deleteCharacter(characterId);
    closeModal();
  });

  document.getElementById("cancel-delete").addEventListener("click", closeModal);
  
}
// Función para cerrar la modal
function closeModal() {
  const modal = document.getElementById("delete-modal");
  if (modal) modal.remove();

  // Mostrar el contenido original
  document.getElementById("app").style.display = "";
  document.querySelector("nav").style.display = "";
}


// Función para eliminar un personaje de la API
export async function deleteCharacter(characterId) {
  try {
    const response = await fetch(`${apiUrl}/${characterId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchCharacters(); // Volver a cargar la lista de personajes después de eliminar
    } else {
      throw new Error("Error al eliminar el personaje.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al eliminar el personaje.");
  }
}

window.deleteCharacter = deleteCharacter;
window.showDeleteModal = showDeleteModal;
// Llamar a la función para obtener y mostrar personajes al cargar la página
fetchCharacters();