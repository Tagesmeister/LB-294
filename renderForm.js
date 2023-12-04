function renderEntryForm() {
    const formHTML = `
    <form id="entry-form">
        <label for="product">Produkt:</label>
        <input type="text" id="product" name="product" required><br><br>

        <label for="stock">Bestand:</label>
        <input type="number" id="stock" name="stock" required><br><br>

        <label for="type">Typ:</label>
        <input type="text" id="type" name="type" required><br><br>

        <label for="current">Aktuell:</label>
        <input type="checkbox" id="current" name="current"><br><br>

        <label for="date">Datum:</label>
        <input type="date" id="date" name="date" required><br><br>

        <input type="submit" value="Speichern">
    </form>
`;

    document.getElementById('main-content').innerHTML = formHTML;
    attachFormSubmitEvent(); // Defined in apiInteraction.js
}
async function renderDeleteForm() {
    
        const data = await renderStockDataForDeleteForm(); // wait for data

        if (data && Array.isArray(data) && data.length > 0) {
            let formHTML = `
                <form id="delete-form">
                    <label for="delete-id">Wähle den Eintrag zum Löschen:</label>
                    <select id="delete-id" name="delete-id" required>
            `;

            // load data with id in deletform
            data.forEach(item => {
                formHTML += `<option value="${item.id}">${item.product}</option>`;
            });

            formHTML += `
                    </select><br><br>
                    <input type="submit" value="Löschen">
                </form>
            `;

            document.getElementById('main-content').innerHTML = formHTML;
            attachDeleteFormSubmitEvent(); 
        } else {
            // if no data available
            document.getElementById('main-content').innerHTML = '<p id="no-delete-data-message">Kein Eintrag zum Löschen verfügbar.</p>';
        }
}

function displayStockData(data) {
    let html = '<div class="stock-data"><h2>Bestandsdaten</h2><ul class="stock-list">';
    data.forEach(item => {
        html += `<li class="stock-item"><div><label>Produkt:</label><span class="stock-value">${item.product}</span></div><div><label>Bestand:</label><span class="stock-value">${item.stock}</span></div><div><label>Typ:</label><span class="stock-value">${item.type}</span></div><div><label>Aktuell:</label><span class="stock-value">${item.current ? 'Ja' : 'Nein'}</span></div><div><label>Datum:</label><span class="stock-value">${item.date}</span></div></li>`;
    });
    html += '</ul></div>';

    document.getElementById('main-content').innerHTML = html;
}
function renderEditSelection(data) {
    // Chat GPT------------------------------------------------------------------
    let selectionHTML = `
        <label for="edit-selection">Produkt auswählen:</label>
        <select id="edit-selection">
            <option value="">Bitte wählen...</option>
    `;
    
    data.forEach(item => {
        selectionHTML += `<option value="${item.id}">${item.product}</option>`;
    });
    //----------------------------------------------------------------------------

    selectionHTML += `</select>`;
    document.getElementById('main-content').innerHTML = selectionHTML;

    // Event Listener for dropdown, to load the Formular with the selected product
    document.getElementById('edit-selection').addEventListener('change', function() {
        const selectedId = this.value;
        const itemToEdit = data.find(item => item.id.toString() === selectedId);
        if (itemToEdit) {
            renderEditForm(itemToEdit); // call renderEditForm with selected object
        }
    });
}
function renderEditForm(item) {
    let formHTML = `
        <div class="edit-item" data-id="${item.id}">
            <h3>Bearbeiten: ${item.product}</h3>
            <form id="edit-form">
                <label for="product-${item.id}">Produkt:</label>
                <input type="text" id="product-${item.id}" name="product" value="${item.product}" required><br><br>

                <label for="stock-${item.id}">Bestand:</label>
                <input type="number" id="stock-${item.id}" name="stock" value="${item.stock}" required><br><br>

                <label for="type-${item.id}">Typ:</label>
                <input type="text" id="type-${item.id}" name="type" value="${item.type}" required><br><br>

                <label for="current-${item.id}">Aktuell:</label>
                <input type="checkbox" id="current-${item.id}" name="current" ${item.current ? 'checked' : ''}><br><br>

                <label for="date-${item.id}">Datum:</label>
                <input type="date" id="date-${item.id}" name="date" value="${item.date}" required><br><br>

                <button type="button" onclick="updateEntry('${item.id}')">Aktualisieren</button></form>
        </div>
    `;

    document.getElementById('main-content').innerHTML = formHTML;
}



