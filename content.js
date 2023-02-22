//A content.js script is “a JavaScript file that runs in the context of web pages.” 
//This means that a content script can interact with web pages that the browser visits.

alert("Ciao! Certo! Sono il content.js")

const selection = () => {
    if (window.getSelection)
        return window.getSelection();
}

const getSelectedText = () => {
    document.getElementById("highlighted").innerText = selection();
}

document.getElementById("button").addEventListener("click", getSelectedText);

