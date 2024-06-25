// PUT //


const showEditForm = (selectedID, sailorName, longDescription, location, name, SailorImg, shortDescription) => {
    cardContainer.innerHTML = `
        <form id ="edit-sailor-form" class="search-form">
            <label>Sailor name: </label>
            <input type="text" id="sailor-name" value="${sailorName || ''}"/>
            <label>Description: </label>
            <textarea cols="30" rows="10" id="sailor-description">${shortDescription || ''}</textarea>

            <label>Sailor Location:</label>
            <select name="Location" id="location-search" class="Sailors-search">
                <option value="Location">Location...</option>
                <option value="Azabu-Juuban" ${location === "Azabu-Juuban" ? 'selected' : ''}>Azabu-Juuban</option>
                <option value="Milenio de Plata" ${location === "Milenio de Plata" ? 'selected' : ''}>Milenio de Plata</option>
                <option value="Mercury" ${location === "Mercury" ? 'selected' : ''}>Mercury</option>
                <option value="Mars" ${location === "Mars" ? 'selected' : ''}>Mars</option>
                <option value="Jupiter" ${location === "Jupiter" ? 'selected' : ''}>Jupiter</option>
                <option value="Venus" ${location === "Venus" ? 'selected' : ''}>Venus</option>
            </select>
            <label>Name: </label>
            <input type="text" id="name2" value="${name || ''}"/>

            <h4>Details:</h4>
            <label>Sailor Image (URL): </label>
            <input type="text" id="sailor-img" value="${SailorImg || ''}"/>
            <label>Long description: </label>
            <textarea cols="30" rows="10" id="sailor-detail">${longDescription || ''}</textarea>
            <div>
                <button class="btn-cancel" id= "cancel-edit" onClick="(${selectedID})">Cancel</button>
                <button class="btn-success" id="submit-sailor"(${selectedID}>Update Sailor</button> 
            </div>
        </form>
    `;

    

    const btnCancelEdit = document.getElementById('cancel-edit')
    btnCancelEdit.addEventListener('click', (e) => {
        e.preventDefault()

    const editSailorForm = document.getElementById('edit-sailor-form')
        editSailorForm.style.display = 'none'
        seeLongDescription(selectedID)
    })
   
    const btnEditSailor = document.getElementById('submit-sailor')
    btnEditSailor.addEventListener('click', (e) => {
        e.preventDefault()
        validateEditSailorForm()
    });
};

const editSailor = (selectedID) => {
    const sailorName = document.getElementById("sailor-name").value;
    const sailorDescription = document.getElementById("sailor-description").value;
    const location = document.getElementById("location-search").value;
    const name = document.getElementById("name2").value;
    const SailorImg = document.getElementById("sailor-img").value;
    const longDescription = document.getElementById("sailor-detail").value;

    fetch(`https://665a1291de346625136ef9a5.mockapi.io/API/Sailors/${selectedID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sailorName: sailorName,
            shortDescription: sailorDescription,
            location: location,
            Name: name,
            Details: {
                SailorImg: SailorImg,
                Details: longDescription,
            },
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        seeSailorDetails(selectedID); // Actualiza los detalles después de la edición
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

const validateEditSailorForm = (selectedID) => {
    const sailorNameInput = document.getElementById("sailor-name");
    const sailorDescriptionInput = document.getElementById("sailor-description");
    const sailorLocationInput = document.getElementById("location-search");
    const nameInput = document.getElementById("name2");
    const sailorImgInput = document.getElementById("sailor-img");
    const sailorDetailInput = document.getElementById("sailor-detail");

    if (
        sailorNameInput.value.trim() === "" ||
        sailorDescriptionInput.value.trim() === "" ||
        sailorLocationInput.value.trim() === "" ||
        nameInput.value.trim() === "" ||
        sailorImgInput.value.trim() === "" ||
        sailorDetailInput.value.trim() === ""
    ) {
        // Mostrar mensaje de error
        errorContainer.innerHTML = `
            <div class="delete-container" id="delete-container">
                <div class="delete-warning"> 
                    <h3>Error</h3>
                    <p>Please fill every field!</p>
                    <div class="btn-container">
                        <button class="btn-success" id="close-alert">Close</button>
                    </div>
                </div>
            </div>`;

        const closeAlert = document.getElementById('close-alert');
        const modalContainer = document.getElementById('delete-container');

        closeAlert.addEventListener('click', () => {
            modalContainer.style.display = 'none';
        });

        return; // Detener la función si hay campos vacíos
    }

    // Si todos los campos están llenos, llamar a editSailor(selectedID)
    editSailor(selectedID);
};