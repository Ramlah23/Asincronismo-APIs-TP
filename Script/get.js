const card = document.querySelector('.card')
const cardContainer = document.querySelector('.card-container')
const enlableSpinner = document.getElementById('render-spinner')
const errorContainer = document.getElementById('warning-container')


const searchForm = document.getElementById('search-form')
const showFooter = document.getElementById('footer')

let selectedID, sailorName, sailorDescription, sailorLocation,sailorCategory, saveSailorName, saveSailorImg, saveSailorDetails

const renderSpinner = () => {
    enlableSpinner.style.display = 'block'
}

const renderErrorDetail = (errorDetail) => {
    errorContainer.innerHTML += `
    <div class="delete-container" id="delete-container">
        <div class="delete-warning"> 
            <h3>Error</h3>
            <p>We're sorry, but something went wrong. </p>

            <p>Error details:</p>
            <p>${errorDetail}</p>


            <div class="btn-container">
                <button class="btn-success" id="close-alert">Go Back</button>
            </div>
        </div>
    </div>
    `
    const deleteContainer = document.getElementById('delete-container')
    const closeAlert = document.getElementById('close-alert')
    closeAlert.addEventListener('click', () => {
        deleteContainer.style.display = 'none'
        beSailor()
    })
    
}

// G E T

const getHorseJobs = () => {
    searchForm.style.display = 'flex'
    fetch('https://665a1291de346625136ef9a5.mockapi.io/API')
        .then(res => res.json())
        .then(data => createSailorCards(data))
        .catch(err => renderErrorDetail(err))
}

beSailor()

const createSailorCards = (sailor) => {
    cardContainer.innerHTML = ''
    renderSpinner()
    setTimeout(() => {
        enlableSpinner.style.display = 'none'
        showFooter.style.display = 'block'
        sailor.forEach(job => {
            const { name, id, description, location, Sailors } = sailor
                cardContainer.innerHTML += `
                            <div class="card">
                                <h2>${name}</h2>
                                    <div>
                                        <p>${description}</p>
                                    </div>
                                <h3> <p class="tag">${location}</p> <p class="tag">${Sailors}</p> </h3>

                                <button onClick="seeJobDetails(${id})">See Details</button>
                            </div>
                        `
    })
 }, 2000)
}

const seeSailorDetails = (sailorId) => {
    showFooter.style.display = 'none'
    fetch(`https://665a1291de346625136ef9a5.mockapi.io/API/${sailorId}`)
        .then(res => res.json())
        .then(data => createCardDetail(data))
        .catch(err => renderErrorDetail(err))
    selectedID = sailorId
}
    
const createCardDetail = (cardDetail) => {
    searchForm.style.display = 'none'

    const { name, location, category, description } = cardDetail
    const { sailorName, sailorImg, sailorDetail } = sailor

    sailorName = name
    sailorDescription = description
    sailorLocation = location
    sailorCategory = category

    saveSailorName = sailorName
    saveSailorDetails = sailorDetail
    saveSailorImg = sailorImg

    cardContainer.innerHTML = ''

    renderSpinner()

    setTimeout( () => {
        enlableSpinner.style.display = 'none'
        showFooter.style.display = 'block'

        cardContainer.innerHTML = `
                    <div class="card-detail">

                        <p class="return" onClick="getSailor()"> <<< Go back</p> 

                        <div class="sailor-container">

                            <div class="sailor-details">
                                <h2>${name}</h2>
                                <div class="sailor-description">
                                    <h4>Sailor Description:</h4>
                                    <p>${description}</p>
                                </div>

                                <div class="tags-container">
                                    <h3>Tags: </h3> 
                                    <div class="tag">${location}</div>
                                    <div class="tag">${category}</div>
                                </div>

                            </div>

                            <div class="sailor-details">
                                <img src="${sailorImg}" alt="${sailorName}"/>
                                <h4>Horse Name: </h4> <p>${sailorName} </p>
                                <h4>Horse Aditional Details:</h4> <p>${sailorDetail}</p>
                            </div>

                        </div>

                        <div class="button-container">
                            <button class="btn-delete" id="delete-sailor">Delete</button>
                            <button class="btn-edit" id="edit-sailor">Edit</button>
                        </div>

                    </div>`

        const btnDeleteJob = document.getElementById('delete-sailor')
        btnDeleteJob.addEventListener('click', warningDelete)

        const btnEditJob = document.getElementById('edit-sailor')
        btnEditJob.addEventListener('click', () => showEditForm(selectedID))
    }, 2000)
}