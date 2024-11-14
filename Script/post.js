import { apiUrl } from './config.js';
import { fetchCharacters } from './get.js';
import { saveCharacter } from './put.js'
// Escuchar el evento de click en el botón de "Agregar Sailor"
document.getElementById("add-sailor-btn").addEventListener("click", showAddSailorForm);

// Mostrar el formulario para agregar un nuevo personaje
function showAddSailorForm() {
   // Ocultar el resto del contenido de la página
   document.getElementById("app").style.display = "none";
   
  const formHtml = `
    <div id="sailor-form">
      <h2>Agregar Nuevo Sailor</h2>
      <label>Nombre de Sailor: <input type="text" id="sailor-name"></label>
      <label>Nombre Real: <input type="text" id="real-name"></label>
      <label>Ubicación: <input type="text" id="location"></label>
      <label>Descripción Corta: <textarea id="short-description"></textarea></label>
       <label>Descripción Larga: <textarea id="long-description"></textarea></label>
      <label>URL de Imagen: <input type="text" id="sailor-img"></label>
      <button id="submit-sailor">Guardar</button>
      <button id="cancel-sailor">Cancelar</button>
    </div>
  `;
  // Insertar el formulario en el body
  document.body.insertAdjacentHTML("beforeend", formHtml);

  // Asignar eventos a los botones del formulario
  document.getElementById("submit-sailor").addEventListener("click", addSailor);
  document.getElementById("cancel-sailor").addEventListener("click", () => {
    document.getElementById("sailor-form").remove(); // Eliminar el formulario
    document.getElementById("app").style.display = ""; // Mostrar contenido
    document.querySelector("nav").style.display = ""; // Mostrar nav
  });
}

// Enviar el nuevo personaje a la API
export async function addSailor() {
  const newSailor = {
    "sailor-name": document.getElementById("sailor-name").value,
    "name": document.getElementById("real-name").value,
    "location": document.getElementById("location").value,
    "short-description": document.getElementById("short-description").value,
    "Details": {
      "SailorImg": document.getElementById("sailor-img").value,
      "long-description": document.getElementById("long-description").value
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSailor)
    });

    if (response.ok) {
      document.getElementById("sailor-form").remove();
      document.getElementById("app").style.display = "";
      fetchCharacters(); // Refresca la lista de personajes
    } else {
      throw new Error("Error al agregar el Sailor");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al agregar el Sailor");
  }
}

window.saveCharacter = saveCharacter;
