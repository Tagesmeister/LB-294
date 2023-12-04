const apiUrl = 'http://localhost:2940/api/v1/entities';
let stockData = []; // Globale Variable to save datas

// Attach an event listener to handle form submission
function attachFormSubmitEvent() {
    document.getElementById('entry-form').addEventListener('submit', function (e) {
        e.preventDefault();

         // Collect data from form fields
        const product = document.getElementById('product').value;
        const stock = document.getElementById('stock').value;
        const type = document.getElementById('type').value;
        const current = document.getElementById('current').checked;
        const date = document.getElementById('date').value;

        // Construct a JSON object from form data
        const entryData = {
            product,
            stock,
            type,
            current,
            date
        };

        // Send a POST request to the API to add new entry
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entryData)
        })
        .then(response => response.json())
        .then(data => {
            // Handle API response, e.g., show confirmation or update UI
            console.log('API-Antwort:', data);
            alert('Eintrag gespeichert!'); // Notify the user
        })
        .catch(error => {
            // Handle any errors, such as showing an error message
            console.error('Fehler beim Senden der Daten an die API:', error);
            alert('Fehler beim Speichern des Eintrags.');
        });

        // Reset the form or perform other actions after submission
        document.getElementById('entry-form').reset(); // Reset the form
    });
}

async function renderStockDataForDeleteForm() {
    // Chat GPT-------------------------------------------------------------------
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fehler beim Laden der Daten für das Löschen:', error);
        alert('Fehler beim Laden der Daten für das Löschen.');
        throw error;
    }
    //----------------------------------------------------------------------------
}

// Attach an event listener to handle delete form submission
function attachDeleteFormSubmitEvent() {
    document.getElementById('delete-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const idToDelete = document.getElementById('delete-id').value;

        // Call deleteData function to delete entry
        deleteData(idToDelete);
    });
}

// Fetch and display stock data from the API
function renderStockData() {
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        return response.json();
    })
    .then(data => {
        displayStockData(data); // Display stock data in the UI
    })
    .catch(error => {
        console.error('Fehler beim Laden der Daten:', error);
        alert('Fehler beim Laden der Daten.');
    });
}

// Function to delete data using a DELETE request
function deleteData(idToDelete) {
    fetch(`${apiUrl}/${idToDelete}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht in Ordnung');
        }
        return response.json();
    })
    .then(data => {
        console.log('Daten erfolgreich gelöscht:', data);
        alert('Daten erfolgreich gelöscht!');
        renderDeleteForm(stockData); // Re-render the page after deletion
    })
    .catch(error => {
        console.error('Fehler beim Löschen der Daten:', error);
        alert('Fehler beim Löschen der Daten.');
    });
}

// Function to load and display entries from the API
async function loadAndDisplayEntries() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht in Ordnung');
        }
        const data = await response.json();
        renderEditSelection(data);

        // Add an event listener for change in selection

        //StackOverflow-------------------------------------------------------------------
        document.getElementById('edit-selection').addEventListener('change', function() {
            const selectedId = this.value;
            currentSelectedId = selectedId; // Update the variable with new ID
            const itemToEdit = data.find(item => item.id.toString() === selectedId);
            if (itemToEdit) {
                renderEditForm(itemToEdit); // Call renderEditForm with the selected object
            }
        });
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
        alert('Fehler beim Laden der Daten.');
    }
    //--------------------------------------------------------------------------------------
}

// Function to update an entry
function updateEntry() {
    // Use the ID from the selected global variable
    const productInput = document.getElementById(`product-${currentSelectedId}`);
    const stockInput = document.getElementById(`stock-${currentSelectedId}`);
    const typeInput = document.getElementById(`type-${currentSelectedId}`);
    const currentInput = document.getElementById(`current-${currentSelectedId}`);
    const dateInput = document.getElementById(`date-${currentSelectedId}`);

    const updatedData = {
        product: productInput.value,
        stock: parseInt(stockInput.value, 10),
        type: typeInput.value,
        current: currentInput.checked,
        date: dateInput.value
    };

    // Perform a fetch request to update the data
    fetch(`${apiUrl}/${currentSelectedId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren der Daten.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Daten erfolgreich aktualisiert:', data);
        alert('Daten erfolgreich aktualisiert!');
        loadAndDisplayEntries(); // Reload and display the entries
    })
    .catch(error => {
        console.error('Fehler beim Aktualisieren der Daten:', error);
        alert('Fehler beim Aktualisieren der Daten.');
    });
}
