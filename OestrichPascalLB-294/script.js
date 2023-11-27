// JavaScript-Code in "script.js"
window.onload = () => {
    navigateTo(location.hash || '#bestandLesen');
};

window.onhashchange = () => {
    navigateTo(location.hash);
};

function navigateTo(hash) {
    switch (hash) {
        case '#bestandLesen':
            document.getElementById('main-content').innerHTML = '<h2>Bestand lesen</h2>';
            break;
        case '#bestand':
            document.getElementById('main-content').innerHTML = '<h2>Bestand entfernen</h2>';
            // Hier kannst du die Funktionen zum Anzeigen des Bestandes implementieren.
            break;
        case '#neu':
            renderEntryForm(); // Ein Formular anzeigen, wenn "#neu" ausgewählt ist
            break;
        default:
            document.getElementById('main-content').innerHTML = '<h2>404 - Seite nicht gefunden</h2>';
    }
}

function renderEntryForm() {
    const formHTML = `
        <h2>Neuer Eintrag</h2>
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

    // Eventlistener für das Formular hinzufügen
    document.getElementById('entry-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Das Standardverhalten des Formulars verhindern (Seite neu laden)

        // Daten aus dem Formular sammeln
        const product = document.getElementById('product').value;
        const stock = document.getElementById('stock').value;
        const type = document.getElementById('type').value;
        const current = document.getElementById('current').checked;
        const date = document.getElementById('date').value;

        // JSON-Objekt erstellen
        const entryData = {
            product,
            stock,
            type,
            current,
            date
        };

        // Hier kannst du Code hinzufügen, um die Daten an deine API zu senden.
        // Zum Beispiel mit fetch() oder einer anderen Methode.

        const apiUrl = 'http://localhost:2940/api/v1/entities';

        // Fetch-Anfrage senden
        fetch(apiUrl, {
            method: 'POST', // HTTP-Methode (in diesem Fall POST für das Hinzufügen neuer Daten)
            headers: {
                'Content-Type': 'application/json' // Der Inhalt des Requests ist JSON
            },
            body: JSON.stringify(entryData) // Die Daten als JSON senden
        })
        .then(response => response.json()) // Die JSON-Antwort verarbeiten (falls erforderlich)
        .then(data => {
            // Hier kannst du Code hinzufügen, um auf die Antwort von deiner API zu reagieren
            // Zum Beispiel eine Bestätigung anzeigen oder die Seite aktualisieren.
            console.log('Antwort von der API:', data);
            alert('Eintrag gespeichert!'); // Benutzer benachrichtigen
        })
        .catch(error => {
            // Hier kannst du Code hinzufügen, um Fehler zu behandeln
            console.error('Fehler beim Senden der Daten an die API:', error);
            alert('Fehler beim Speichern des Eintrags.');
        });

        // Nach dem Absenden das Formular leeren oder eine Bestätigung anzeigen
        document.getElementById('entry-form').reset(); // Das Formular leeren
        alert('Eintrag gespeichert!'); // Benutzer benachrichtigen
    });
}
