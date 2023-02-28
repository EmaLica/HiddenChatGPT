//Although the extension has been installed, it has no instruction. 
//Introduce a background script by creating a file titled 
//background.js and placing it inside the extension directory.

chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'calcola':
            duplicateTab();
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});


function duplicateTab() {
    chrome.tabs.executeScript({
        code : "window.getSelection().toString();"
    }, async function(selection){
        alert(selection[0])
        const ans = await generateQuery(selection[0]);
        prompt("Copy to clipboard: Ctrl+C, Enter", ans);
    }
    )
}

async function generateQuery(query) {
    const apiKey = "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";
    const url = `https://api.openai.com/v1/engines/text-davinci-003/completions`;
    const data = {
      prompt: query,
      max_tokens: 2000,
      temperature: 0,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.choices[0].text;
  }