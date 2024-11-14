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
  const sailorName = document.getElementById("sailor-name").value.trim();
  const realName = document.getElementById("real-name").value.trim();
  const location = document.getElementById("location").value.trim();
  const shortDescription = document.getElementById("short-description").value.trim();
  const longDescription = document.getElementById("long-description").value.trim();
  const sailorImg = document.getElementById("sailor-img").value.trim();

  // Validaciones de cada campo
  if (!sailorName) {
    alert("Por favor, ingresa el nombre del Sailor.");
    return;
  }
  if (!realName) {
    alert("Por favor, ingresa el nombre real.");
    return;
  }
  if (!location) {
    alert("Por favor, ingresa la ubicación.");
    return;
  }
  if (!shortDescription) {
    alert("Por favor, ingresa una descripción corta.");
    return;
  }
  if (!longDescription) {
    alert("Por favor, ingresa una descripción larga.");
    return;
  }
  if (!sailorImg || !isValidUrl(sailorImg)) {
    alert("Por favor, ingresa una URL válida para la imagen.");
    return;
  }

  // Si las validaciones pasan, crea el objeto newSailor
  const newSailor = {
    "sailor-name": sailorName,
    "name": realName,
    "location": location,
    "short-description": shortDescription,
    "Details": {
      "SailorImg": sailorImg,
      "long-description": longDescription
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

// Función para validar si una URL es válida
function isValidUrl(url) {
  const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocolo
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // dominio
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // dirección IP
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // puerto y ruta
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // cadena de consulta
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragmento
  return !!urlPattern.test(url);
}
window.saveCharacter = saveCharacter;
