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

const { Configuration, OpenAIApi } = require("openai");

function duplicateTab() {
    chrome.tabs.executeScript({
        code : "window.getSelection().toString();"
    }, async function(selection){
        alert(selection[0])
        const ans = await generateQuery(selection[0]);
        alert(ans);
    }
    )
}

async function generateQuery(query) {
    alert("pippozzo duro");
    const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        temperature: 0,
        max_tokens: 2000,
      });

      return response.choices[0].text;


  }