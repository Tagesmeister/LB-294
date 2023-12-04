document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    const loginForm = document.getElementById('login-form');

    loginButton.addEventListener('click', showLoginForm);

    function showLoginForm() {
        const loginSection = document.getElementById('login-section');
        loginSection.style.display = 'block';
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Make a POST request to the backend API for login
        fetch('http://localhost:2941/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {

            const mainContent = document.getElementById('main-content');
            const navigation = document.getElementById('navigation');
            mainContent.style.display = 'block';
            navigation.style.display = 'block';

            // Add event listeners to navigation links and enable data manipulation
            addNavigationLinks();
        })
        .catch(error => {
            // Handle login failure error message
            console.error('Login error:', error);
            alert('Login fehlgeschlagen, Überprüfe deine Anmeldedaten.');
        });
    });
});
function addNavigationLinks() {

    const navigation = document.getElementById('navigation');
    
    // Überprüfen, ob die Links bereits hinzugefügt wurden
    if (navigation.getElementsByClassName('manipulate-data-link').length > 0) {
        return; // Beendet die Funktion früh, wenn Links schon vorhanden sind
    }
    
//Chat GPT---------------------------------------------------------------------
    const links = [
        { href: '#bestandLesen', text: 'Bestand lesen' },
        { href: '#neu', text: 'Neuer Eintrag' },
        { href: '#bestandBearbeiten', text: 'Bestand bearbeiten'},
        { href: '#bestandEntfernen', text: 'Bestand entfernen' }
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.classList.add('manipulate-data-link');
        navigation.appendChild(a);
    });
    assignNavigationEventHandlers();
    //------------------------------------------------------------------------
}