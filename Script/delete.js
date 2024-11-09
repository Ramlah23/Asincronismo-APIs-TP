import { apiUrl } from "./config.js";
import { fetchCharacters } from "./get.js"

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
  // Llamar a la función para obtener y mostrar personajes al cargar la página
  fetchCharacters();
  