var listDivs = {};
var jsonList = {};

window.onload = function () {

    const dropdown = document.getElementById('modSelect');
    const dialogueListRoot = document.getElementById('dialogueListRoot');
    

    jsonList =fetch('./list.json')
        .then(response => {return response.json()})
        .then(responseData => {
            console.log(responseData); 
            return responseData;
        })
        .then(responseData => {
            for (let i = 0; i < responseData.length; i++) {
                let modName = responseData[i].modName
                dropdown.insertAdjacentHTML("beforeend", '<option value="' + modName + '">' + modName + "  (by: " + responseData[i].modAuthor+')</option>')

                let newDListHTML="<div style='display:none;'>"
                for (let j = 0; j < responseData[i].dialogues.length; j++) {
                    let d = responseData[i].dialogues[j]
                    newDListHTML += ' <a href="./view.html?xml=' + d.xmlUrl + '">' + d.charName +'</a><br/>'
                }
                newDListHTML += "</div>";
                dialogueListRoot.insertAdjacentHTML("beforeend", newDListHTML);
                listDivs[modName]=dialogueListRoot.lastElementChild;
            }

            console.log(listDivs)

            return responseData;
        })
        .catch(error => {
            console.error('error:', error);
        });


    dropdown.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        console.log("dropdown:", selectedValue);

        for (let i in listDivs){
            console.log(listDivs[i])
            listDivs[i].setAttribute("style","display:none;")
        }
        if (listDivs[selectedValue] != null) {
            listDivs[selectedValue].setAttribute("style", "display:block;");
        }

    });

};
