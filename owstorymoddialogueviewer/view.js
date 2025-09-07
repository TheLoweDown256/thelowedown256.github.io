const x2js = new X2JS();
var xmlData = null;

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('xml');//document.getElementById('urlInput').value;
    const contentDisplay = document.getElementById('rawContent');
    charName=null;

    if (url) {
        contentDisplay.textContent = 'Loading...';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                contentDisplay.textContent = data;

                console.log(x2js)
                xmlData = x2js.xml2js(data);
                console.log(xmlData)
                charName = xmlData.DialogueTree.NameField
                if (charName != null) {
                    document.getElementById('viewCharName').textContent = "Viewing Dialogue For Character: " + charName;
                    document.getElementById('viewRawXml').insertAdjacentHTML("beforeend", "<a href='" + url+"'>" + url+  "</a>");
                    document.title = "Outer Wilds Modded Dialogue Viewer: " + charName;
                }

            })
            .catch(error => {
                contentDisplay.textContent = 'Error: ' + error.message;
            });
        
    } else {
        contentDisplay.textContent = 'Select a dialogue to view from from the back button ./select.html.';
    }
};
