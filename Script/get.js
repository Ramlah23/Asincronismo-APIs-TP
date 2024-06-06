// GET

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const enlableSpinner = document.getElementById('render-spinner');
    const errorContainer = document.getElementById('warning-container');
    const searchForm = document.getElementById('search-form');
    const showFooter = document.getElementById('footer');

    const renderSpinner = () => {
        enlableSpinner.style.display = 'block';
    };

    const hideSpinner = () => {
        enlableSpinner.style.display = 'none';
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
            const { Sailors, id, description, location, name } = sailor;
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
                    <button class="see-details-btn" data-id="${id}">See Details</button>
                </div>
            `;
        });

        document.querySelectorAll('.see-details-btn').forEach(button => {
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
                // Handle displaying sailor details
            })
            .catch(err => renderErrorDetail(err));
    };

    beSailor();
});