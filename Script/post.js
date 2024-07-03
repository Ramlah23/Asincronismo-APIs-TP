// P O S T

const createNewSailor = () => {
  document.getElementById('search-form').style.display = 'none';
  const cardContainer = document.querySelector('.card-container');
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
      <label>Name: </label>
      <input type="text" id="name2" />
      <h4>Details:</h4>
      <label>Sailor Image (URL): </label>
      <input type="text" id="sailor-img" />
      <label>Long description: </label>
      <textarea cols="30" rows="10" id="sailor-detail"></textarea>
      <div>
        <button type="button" class="btn-cancel" onClick="beSailor()">Cancel</button>
        <button type="button" class="btn-success" id="btn-confirm-add-sailor">Create Sailor</button>
      </div>
    </form>
  `;

  document.getElementById('btn-confirm-add-sailor').addEventListener('click', (e) => {
    e.preventDefault();
    validateNewSailorForm();
  });
};

const saveSailorInfo = () => {
  return {
    SailorName: document.getElementById('sailor-name').value,
    Location: document.getElementById('location-search').value,
    ShortDescription: document.getElementById('sailor-description').value,
    Name: document.getElementById('name2').value,
    Details: {
      SailorImg: document.getElementById('sailor-img').value,
      LongDescription: document.getElementById('sailor-detail').value,
    },
  };
};

const submitNewSailor = () => {
  fetch('https://665a1291de346625136ef9a5.mockapi.io/API/Sailors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(saveSailorInfo()),
  })
  .then(() => {
    setTimeout(beSailor, 1000); // Redirigir o realizar alguna acción después de agregar
  })
  .catch((err) => console.log(err));
};

const validateNewSailorForm = () => {
  const sailorNameInput = document.getElementById('sailor-name');
  const sailorDescriptionInput = document.getElementById('sailor-description');
  const sailorLocationInput = document.getElementById('location-search');
  const nameInput = document.getElementById('name2');
  const sailorImgInput = document.getElementById('sailor-img');
  const sailorDetailInput = document.getElementById('sailor-detail');
  const errorContainer = document.getElementById('warning-container');


  console.log({
    sailorName: sailorNameInput.value,
    sailorDescription: sailorDescriptionInput.value,
    sailorLocation: sailorLocationInput.value,
    name: nameInput.value,
    sailorImg: sailorImgInput.value,
    sailorDetail: sailorDetailInput.value,
  });

  if (
    sailorNameInput.value.trim() === '' ||
    sailorDescriptionInput.value.trim() === '' ||
    sailorLocationInput.value === 'location' ||
    nameInput.value.trim() === '' ||
    sailorImgInput.value.trim() === '' ||
    sailorDetailInput.value.trim() === ''
  ) {
    errorContainer.innerHTML = `
      <div class="delete-container" id="delete-container">
        <div class="delete-warning"> 
          <h3>Error</h3>
          <p>Please fill in all required fields.</p>
          <div class="btn-container">
            <button class="btn-success" id="close-alert">Close</button>
          </div>
        </div>
      </div>`;
    document.getElementById('close-alert').addEventListener('click', () => {
      document.getElementById('delete-container').style.display = 'none';
    });
  } else {
    submitNewSailor();
  }
};

document.getElementById('btn-add-sailor').addEventListener('click', createNewSailor);
