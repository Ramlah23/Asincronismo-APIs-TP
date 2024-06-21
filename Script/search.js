// S E A R C H   F I L T E R 

const searchBy = document.getElementById('search-by');
const locationSearch = document.getElementById('location-search');
const categorySearch = document.getElementById('sailor-search');
const btnSearch = document.getElementById('btn-search');
const btnCancelSearch = document.getElementById('btn-cancel-search');

// Variables de estado
let primaryFilter = '';
let secondaryFilter = '';

// Evento cuando cambia la selección de búsqueda principal
searchBy.addEventListener('change', () => {
    primaryFilter = searchBy.value;

    // Mostrar u ocultar barras de búsqueda según la selección
    if (primaryFilter === 'Location') {
        locationSearch.classList.add('show-bar');
        categorySearch.classList.remove('show-bar');
    } else if (primaryFilter === 'Category') {
        locationSearch.classList.remove('show-bar');
        categorySearch.classList.add('show-bar');
    } else {
        locationSearch.classList.remove('show-bar');
        categorySearch.classList.remove('show-bar');
    }
});

// Evento cuando se selecciona una ubicación
locationSearch.addEventListener('change', () => {
    secondaryFilter = locationSearch.value;
});


// Función para realizar la búsqueda filtrada
const filterSearch = () => {
    if (secondaryFilter.trim() !== '') {
        fetch(`https://665a1291de346625136ef9a5.mockapi.io/API/Sailors/?${primaryFilter}=${secondaryFilter}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                // Aquí deberías manejar la respuesta de la API, por ejemplo:
                createSailorCards(data);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                // Aquí puedes mostrar un mensaje de error al usuario si es necesario
            });
    } else {
        // Manejo cuando el filtro secundario está vacío (opcional)
        console.warn('Secondary filter is empty');
    }
};

// Evento de clic en el botón de búsqueda
btnSearch.addEventListener('click', filterSearch);

// Evento de clic en el botón de cancelar búsqueda
btnCancelSearch.addEventListener('click', () => {
    // Restablecer la interfaz de usuario a su estado inicial
    primaryFilter = '';
    secondaryFilter = '';
    searchBy.value = 'SearchBy';
    locationSearch.classList.remove('show-bar');
    categorySearch.classList.remove('show-bar');
    // Aquí podrías llamar a una función para restablecer la vista a su estado inicial
});