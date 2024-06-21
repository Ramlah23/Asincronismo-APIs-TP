// PUT //


const showEditForm = (selectedID, sailorName, longDescription, location, SailorImg, shortDescription) => {
    cardContainer.innerHTML = `
        <form class="search-form">
            <label>Sailor Name: </label>
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

            <h4>Details:</h4>

            <label>Sailor Image (URL): </label>
            <input type="text" id="sailor-img" value="${SailorImg || ''}"/>
            <label>Long description: </label>
            <textarea cols="30" rows="10" id="sailor-detail">${longDescription || ''}</textarea>
            <div>
                <button class="btn-cancel" onClick="seeSailorDetails(${selectedID})">Cancel</button>
                <button class="btn-success" id="submit-sailor"(${selectedID}>Update Sailor</button> 
            </div>
        </form>
    `;

    


    const btnCancelEdit = document.getElementById('cancel-edit');
    btnCancelEdit.addEventListener('click', (e) => {
        e.preventDefault();
        const editSailorForm = document.querySelector('.search-form');
        editSailorForm.style.display = 'none';
        seeSailorDetails(selectedID);
    });

    const btnEditSailor = document.getElementById('btn-edit-sailor');
    btnEditSailor.addEventListener('click', (e) => {
        e.preventDefault();
        validateEditSailorForm(selectedID);
    });
};

const editSailor = (selectedID) => {
    const sailorName = document.getElementById("sailor-name").value;
    const sailorDescription = document.getElementById("sailor-description").value;
    const sailorLocation = document.getElementById("location-search").value;
    const sailorCategory = document.getElementById("Sailors-search").value;
    const sailorImg = document.getElementById("sailor-img").value;
    const sailorDetail = document.getElementById("sailor-detail").value;

    fetch(`https://665a1291de346625136ef9a5.mockapi.io/API/Sailors/${selectedID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({
            name: sailorName,
            description: sailorDescription,
            location: sailorLocation,
            Sailors: sailorCategory,
            sailor: {
                name: sailorName,
                img: sailorImg,
                detail: sailorDetail,
            },
        })
    })
    .then(() => seeSailorDetails(selectedID))
    .catch(err => console.log(err));
};

const validateEditSailorForm = (selectedID) => {
    const sailorNameInput = document.getElementById("sailor-name2");
    const sailorDescriptionInput = document.getElementById("sailor-description");
    const sailorLocationInput = document.getElementById("location-search");
    const sailorCategoryInput = document.getElementById("Sailors-search");
    const sailorImgInput = document.getElementById("sailor-img");
    const sailorDetailInput = document.getElementById("sailor-detail");

    if (
        sailorNameInput.value === "" ||
        sailorDescriptionInput.value === "" ||
        sailorCategoryInput.value === "Sailors" ||
        sailorLocationInput.value === "Location" ||
        sailorImgInput.value === "" ||
        sailorDetailInput.value === ""
    ) {
        errorContainer.innerHTML = `
        <div class="delete-container" id="delete-container">
            <div class="delete-warning"> 
                <h3>Error</h3>
                <p>Please fill every field! </p>
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
    } else {
        editSailor(selectedID);
    }
};