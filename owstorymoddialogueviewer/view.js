const x2js = new X2JS();
var xmlData = null;

const pagesElement = document.getElementById('pages');
const buttonsDiv = document.getElementById('diaButtons');

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('xml');//document.getElementById('urlInput').value;
   // const contentDisplay = document.getElementById('rawContent');
    
    charName=null;

    if (url) {
        //contentDisplay.textContent = 'Loading...';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
               // contentDisplay.textContent = data;

                console.log(x2js)
                xmlData = x2js.xml2js(data);
                console.log(xmlData)
                charName = xmlData.DialogueTree.NameField
                if (charName != null) {
                    document.getElementById('viewCharName').textContent += charName;
                    document.getElementById('viewRawXml').insertAdjacentHTML("beforeend", "<a href='" + url+"'>" + url+  "</a>");
                    document.title = "Outer Wilds Modded Dialogue Viewer: " + charName;
                }

                jumpToDNodeByXMLIndex(0);

            })
            .catch(error => {
                //contentDisplay.textContent = 'Error: ' + error.message;
            });
        
    } else {
        //contentDisplay.textContent = 'Select a dialogue to view from from the back button ./select.html.';
    }
};

this.jumpToDNode = function (nodeID) {
    if (xmlData != null) {
        let nodes = convertTo1LenArrayIfNormal(xmlData.DialogueTree.DialogueNode);
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].Name==nodeID) {
                jumpToDNodeByXMLIndex(i);
            }
        }
        
    }
};

this.jumpToDNodeByXMLIndex = function (nodeIndex) {
    if (xmlData != null) {
        
       // console.log(xmlData)
       // console.log(xmlData.DialogueTree)
       // console.log(xmlData.DialogueTree.DialogueNode)
       // console.log(convertTo1LenArrayIfNormal(xmlData.DialogueTree.DialogueNode))
        let node = convertTo1LenArrayIfNormal(xmlData.DialogueTree.DialogueNode)[nodeIndex];
        //console.log(node)
        //console.log("a1 " + node.Dialogue)
        //console.log("a2 " + node.Dialogue.Page)
        let pages = convertTo1LenArrayIfNormal(node.Dialogue.Page)
        //console.log("b " + pages)
        pagesElement.innerHTML = ""
        for (let i = 0; i < pages.length; i++) {
            console.log("c " +pages[i])
            pagesElement.insertAdjacentHTML("beforeend", "<pre>" + pages[i] +"</pre>")
        }

        let dOptions = convertTo1LenArrayIfNormal(node.DialogueOptionsList.DialogueOption);
        buttonsDiv.innerHTML = ""
        console.log(dOptions)
        for (let i = 0; i < dOptions.length; i++) {
            //   console.log("<button onclick='onDiaButtonClicked(" + dOptions[i].DialogueTarget + ")>" + dOptions[i].Text + "</button>")

            let oText = dOptions[i].Text;//.replace("'", "\\'").replace("\"", "\\\"")
            console.log(oText)
            let temp1 = "<button onclick='onDiaButtonClicked(\"" + dOptions[i].DialogueTarget + "\")'>" + oText + "</button>"
            console.log(temp1)
            buttonsDiv.insertAdjacentHTML("beforeend", temp1);
        }
    }
};

this.convertTo1LenArrayIfNormal = function (dat) {
   // console.log("AAAAAA "+dat)
    if (Array.isArray(dat)) {
     //   console.log("YESARRAY")
        return dat;
    }
    else {
      //  console.log("NOTARRAY")
        return [dat];
    }
}

onDiaButtonClicked = function (nodeID) {
    console.log("BUTTON NODE ID THING: "+nodeID)
    jumpToDNode(nodeID);
}