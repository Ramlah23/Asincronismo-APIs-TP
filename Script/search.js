// S E A R C H   F I L T E R 

const searchBy = document.getElementById('search-by')

const locationSearch = document.getElementById('location-search')
const categorySearch = document.getElementById('sailor-search')

let primaryFilter = ''
let secondaryFilter = ' '

searchBy.addEventListener('change', () => {
    primaryFilter = searchBy.value

    if (searchBy.value === 'Location') {
        locationSearch.classList.add('show-bar')
        categorySearch.classList.remove('show-bar')

    } else  if (searchBy.value === 'Category') {
        locationSearch.classList.remove('show-bar')
        categorySearch.classList.add('show-bar')

    } else {
            locationSearch.classList.remove('show-bar')
            categorySearch.classList.remove('show-bar')
    }

    if (primaryFilter === 'Location') {
        locationSearch.addEventListener('change', () => {
            secondaryFilter = locationSearch.value
        })
    } else if (primaryFilter === 'Category') {
        categorySearch.addEventListener('change', () => {
            secondaryFilter = categorySearch.value
        }) 
    } 
})


const filterSearch = (secondaryFilter) => {
    fetch(`https://665a1291de346625136ef9a5.mockapi.io/API/user/?search=${secondaryFilter}`)
        .then(res => res.json())
        .then(data => createSailorCards(data))
        .catch(err => renderErrorDetail(err))
}

const btnSearch = document.getElementById('btn-search')
const btnCancelSearch = document.getElementById('btn-cancel-search')

btnSearch.addEventListener('click', () => filterSearch(secondaryFilter))

btnCancelSearch.addEventListener('click', () => {
    beSailor()
    primaryFilter = ''
    secondaryFilter = ''
    searchBy.value = 'SearchBy'
    locationSearch.classList.remove('show-bar')
    categorySearch.classList.remove('show-bar')
})