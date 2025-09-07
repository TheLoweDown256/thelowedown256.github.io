document.getElementById('fetchButton').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    const contentDisplay = document.getElementById('rawContent');

    if (url) {
        // Clear previous content and show a loading message
        contentDisplay.textContent = 'Fetching...';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                // Display the raw text
                contentDisplay.textContent = data;
            })
            .catch(error => {
                // Display any errors
                contentDisplay.textContent = 'Error: ' + error.message;
                console.error('There was a problem with the fetch operation:', error);
            });
    } else {
        contentDisplay.textContent = 'Please enter a URL.';
    }
});
