//GET

const cardContainer = document.querySelector('.card-container');
const enableSpinner = document.getElementById('render-spinner');
const errorContainer = document.getElementById('warning-container');
const searchForm = document.getElementById('search-form');
const showFooter = document.getElementById('footer');

const renderSpinner = () => {
    enableSpinner.style.display = 'block';
};

const hideSpinner = () => {
    enableSpinner.style.display = 'none';
};

const renderErrorDetail = (errorDetail) => {
    errorContainer.innerHTML = `
    <div class="delete-container" id="delete-container">
        <div class="delete-warning"> 
            <h3>Error</h3>
            <p>We're sorry, but something went wrong.</p>
            <p>Error details:</p>
            <p>${errorDetail}</p>
            <div class="btn-container">
                <button class="btn-success" id="close-alert">Go Back</button>
            </div>
        </div>
    </div>
    `;
    const deleteContainer = document.getElementById('delete-container');
    const closeAlert = document.getElementById('close-alert');
    closeAlert.addEventListener('click', () => {
        deleteContainer.style.display = 'none';
        beSailor();
    });
};

const beSailor = () => {
    getSailorData();
};

const getSailorData = () => {
    searchForm.style.display = 'flex';
    renderSpinner();
    fetch('https://665a1291de346625136ef9a5.mockapi.io/API/Sailors')
        .then(res => res.json())
        .then(data => {
            hideSpinner();
            createSailorCards(data);
        })
        .catch(err => {
            hideSpinner();
            renderErrorDetail(err);
        });
};

const createSailorCards = (sailors) => {
    cardContainer.innerHTML = '';
    sailors.forEach(sailor => {
        const { name, id, description, location, Sailors } = sailor;
        cardContainer.innerHTML += `
            <div class="card">
                <h2>${Sailors}</h2>
                <div>
                    <p>${description}</p>
                </div>
                <h3>
                    <p class="tag">${location}</p>
                    <p class="tag">${name}</p>
                </h3>
                <button class="btn-detail" data-id="${id}">See Details</button>
            </div>
        `;
    });

    // Attach event listeners to the newly created detail buttons
    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', (event) => {
            const sailorId = event.target.getAttribute('data-id');
            seeSailorDetails(sailorId);
        });
    });
};

const seeSailorDetails = (sailorId) => {
    showFooter.style.display = 'none';
    fetch(`https://665a1291de346625136ef9a5.mockapi.io/API/Sailors/${sailorId}`)
        .then(res => res.json())
        .then(data => {
            createCardDetail(data);
        })
        .catch(err => renderErrorDetail(err));
};

const warningDelete = () => {
    alert('Are you sure you want to delete this Sailor?');
};


const createCardDetail = (cardDetail) => {
    searchForm.style.display = 'none';

    const { name, location, description, Details } = cardDetail;

    cardContainer.innerHTML = '';

    renderSpinner();

    setTimeout(() => {
        enableSpinner.style.display = 'none';
        showFooter.style.display = 'block';

        cardContainer.innerHTML = `
            <div class="card-detail">
                <p class="return" onClick="beSailor()"> <<< Go back</p>
                <div class="skills-sailor-container">
                    <div class="skills-details">
                        <h2>${name}</h2>
                        <div class="sailor-description">
                            <h4>Skills Description:</h4>
                            <p>${description}</p>
                        </div>
                        <div class="tags-container">
                            <h3>Tags: </h3> 
                            <div class="tag">${location}</div>
                           
                        </div>
                    </div>
                    <div class="sailor-details">
                        <img src="${Details.SailorImg}" alt="${name}" />
                        <h4>Sailor Name: </h4> <p>${Details.SailorName}</p>
                        <h4>Sailor Additional Details:</h4> <p>${Details.SailorDetail}</p>
                    </div>
                </div>
                <div class="button-container">
                    <button class="btn-delete" id="delete-sailor">Delete</button>
                    <button class="btn-edit" id="edit-sailor">Edit</button>
                </div>
            </div>`;

        const btnDeleteSailor = document.getElementById('delete-sailor');
        btnDeleteSailor.addEventListener('click', warningDelete);

        const btnEditSailor = document.getElementById('edit-sailor');
        btnEditSailor.addEventListener('click', () => showEditForm(cardDetail.id));
    }, 2000);
};

beSailor();