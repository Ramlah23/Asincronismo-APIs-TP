// P O S T

const createNewSailor = () => {
  searchForm.style.display = "none";
  cardContainer.innerHTML = `
              <form class="search-form">
                  <label>Sailor Name: </label>
                      <input type="text" id="sailor-name" />
                  <label>Description: </label>
                      <textarea cols="30" rows="10" id="sailor-description"></textarea>
  
                  <label>Sailor Location:</label>
                  <select name="Location" id="location-search" class="Sailors-search">
                  <option value="Location">Location...</option>
                  <option value="Azabu-Juuban">Azabu-Juuban</option>
                  <option value="Milenio de Plata">Milenio de Plata</option>
                  <option value="Mercury">Mercury</option>
                  <option value="Mars">Mars</option>
                  <option value="Jupiter">Jupiter</option>
                  <option value="Venus">Venus</option>
              </select>
  
                  
                  <h4>Details:</h4>
                  <label>Name: </label>
                      <input type="text" id="name" />
                  <label>Sailor Image (URL): </label>
                      <input type="text" id="sailor-img"/>
                  <label>Long description: </label>
                      <textarea cols="30" rows="10" id="sailor-detail"></textarea>
                  <div>
                      <button class="btn-cancel" onClick="beSailor()">Cancel</button>
                      <button class="btn-success" id="submit-sailor">Create Sailor</button> 
                  </div>
              </form>
              `;

  const sailorName = document.getElementById("sailor-name");
  const sailorDescription = document.getElementById("sailor-description");
  const sailorLocation = document.getElementById("location-search");
  const sailorCategory = document.getElementById("Sailors-search");

  const sailor2NameInput = document.getElementById("sailor-name");
  const sailor2ImgInput = document.getElementById("sailor-img");
  const sailor2DetailInput = document.getElementById("sailor-detail");

  const submitSailor = document.getElementById("submit-sailor");
  submitSailor.addEventListener("click", (e) => {
    e.preventDefault();
    validateNewSailorForm();
  });
};
console.log(createNewSailor);

const btnAddSailor = document.getElementById("btn-add-sailor");

btnAddSailor.addEventListener("click", createNewSailor);

const saveSailorInfo = () => {
  return {
    name: document.getElementById("sailor-name").value,
    description: document.getElementById("sailor-description").value,
    location: document.getElementById("location-search").value,
    category: document.getElementById("Sailors-search").value,
    sailor: {
      name: document.getElementById("sailor-name").value,
      img: document.getElementById("sailor-img").value,
      detail: document.getElementById("sailor-detail").value,
    },
  };
};

const submitNewSailor = () => {
  fetch(`https://665a1291de346625136ef9a5.mockapi.io/API/Sailors`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveSailorInfo()),
  })
    .then(() => setTimeout(beSailor, 1000))
    .catch((err) => console.log(err));
};

const validateNewSailorForm = () => {
  const sailorNameInput = document.getElementById("sailor-name");
  const sailorDescriptionInput = document.getElementById("sailor-description");
  const sailorLocationInput = document.getElementById("location-search");
  const sailorCategoryInput = document.getElementById("Sailors-search");
  const sailor2NameInput = document.getElementById("sailor-name");
  const sailor2ImgInput = document.getElementById("sailor-img");
  const sailor2DetailInput = document.getElementById("sailor-detail");

  if (
    sailorNameInput.value === "" ||
    sailorDescriptionInput.value === "" ||
    sailorCategoryInput.value === "Sailors" ||
    sailorLocationInput.value === "Location" ||
    sailor2NameInput.value === "" ||
    sailor2ImgInput.value === "" ||
    sailor2DetailInput.value === ""
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
  } else {
    submitNewSailor();
  }

  const closeAlert = document.getElementById("close-alert");
  const modalContainer = document.getElementById("delete-container");

  closeAlert.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
};
