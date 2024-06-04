// P O S T 

const createNewSailor = () => {
    searchForm.style.display = 'none'
    cardContainer.innerHTML = `
            <form class="create-sailor-form">
                <label>sailor Name: </label>
                    <input type="text" id="sailor-name" />
                <label>Description: </label>
                    <textarea cols="30" rows="10" id="sailor-description"></textarea>

                <label>sailor location:</label>
                    <select name="Location" id="job-location">
                        <option value="Location">Location...</option>
                        <option value="Country">CABA</option>
                        <option value="GBA Norte">GBA Norte</option>
                        <option value="GBA Oeste">GBA Oeste</option>
                        <option value="GBA Sur">GBA Sur</option>
                    </select>

                <label>Job Seniority:</label>
                    <select name="Seniority" id="job-seniority">
                        <option value="Seniority">Seniority...</option>
                        <option value="Trainee">Trainee</option>
                        <option value="Junior">Junior</option>
                        <option value="Semi-Senior">Semi Senior</option>
                        <option value="Senior">Senior</option>
                    </select>
                
                <label>Job Category:</label>
                    <select name="Category" id="job-category">
                        <option value="Category">Category...</option>
                        <option value="Horse Care">Horse Care</option>
                        <option value="Competition">Competition</option>
                        <option value="Training">Training</option>
                        <option value="Breeding">Breeding</option>
                    </select>

                <h4>Horse Details:</h4>

                <label>Horse Name: </label>
                    <input type="text" id="horse-name"/>
                <label>Horse Img (Url): </label>
                    <input type="text" id="horse-img"/>
                <label>Horse Details: </label>
                    <textarea cols="30" rows="10" id="horse-detail"></textarea>
                <div>
                    <button class="btn-cancel" onClick="getHorseJobs()">Cancel</button>
                    <button class="btn-success" id="submit-job">Create job</button> 
                </div>
            </form>
            `
    const jobName = document.getElementById('job-name')
    const jobDescription = document.getElementById('job-description')
    const jobLocation = document.getElementById('job-location')
    const jobCategory = document.getElementById('job-category')
    const jobSeniority =  document.getElementById('job-seniority')

    const horseName = document.getElementById('horse-name')
    const horseImg = document.getElementById('horse-img')
    const horseDetail = document.getElementById('horse-detail')

    const submitJob = document.getElementById('submit-job')
    submitJob.addEventListener('click', (e) => {
        e.preventDefault()
        validateNewJobForm()
    })
}

const btnCreateJob = document.getElementById('btn-create-job')

btnCreateJob.addEventListener('click', createNewJob)

const saveJobInfo = () => {
    return {
        name: document.getElementById('job-name').value,
        description: document.getElementById('job-description').value,
        location: document.getElementById('job-location').value,
        category: document.getElementById('job-category').value,
        seniority: document.getElementById('job-seniority').value,
        horse: {
            horseName:document.getElementById('horse-name').value,
            horseImg: document.getElementById('horse-img').value,
            horseDetail: document.getElementById('horse-detail').value
        }
    } 
}

const submitNewJob = () => {
    
    fetch(`https://6277e34508221c96846a7195.mockapi.io/jobs`, {
            method: "POST",
            headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(saveJobInfo())
            })
            .then(() => setTimeout(getHorseJobs(), 1000))
            .catch(err => console.log(err))
        }
        
const validateNewJobForm = () => {

    const jobName = document.getElementById('job-name')
    const jobDescription = document.getElementById('job-description')
    const jobLocation = document.getElementById('job-location')
    const jobCategory = document.getElementById('job-category')
    const jobSeniority =  document.getElementById('job-seniority')

    const horseName = document.getElementById('horse-name')
    const horseImg = document.getElementById('horse-img')
    const horseDetail = document.getElementById('horse-detail')

    if (jobName.value === '' || jobDescription.value === '' || jobCategory.value === 'Category' || jobSeniority.value === 'Seniority' || jobLocation.value === 'Location' || horseName.value === '' || horseImg.value === '' || horseDetail.value === '') {
        errorContainer.innerHTML = `
        <div class="delete-container" id="delete-container">
        <div class="delete-warning"> 
            <h3>Error</h3>
            <p>Please fill every field! </p>

            <div class="btn-container">
                <button class="btn-success" id="close-alert">Close</button>
            </div>
        </div>
    </div>`
    } else {
        submitNewJob()
    }

    const closeAlert = document.getElementById('close-alert')
    const modalContainer = document.getElementById('delete-container')

    closeAlert.addEventListener('click', () => {
        modalContainer.style.display = 'none'
    })
}