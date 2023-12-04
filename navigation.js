function assignNavigationEventHandlers() {
    const manipulateDataLinks = document.querySelectorAll('.manipulate-data-link');
    manipulateDataLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
}

// navigation to different .js
    function handleNavigation(event) {
        event.preventDefault(); 
        const target = event.target;
        
        if (target.href.includes('#bestandLesen')) {
            renderStockData(); 

        } else if (target.href.includes('#neu')) {
            renderEntryForm(); 

        } else if (target.href.includes('#bestandEntfernen')) {
            renderDeleteForm(); 
        }
        else if(target.href.includes('#bestandBearbeiten')) {
            loadAndDisplayEntries();
        }
    }
