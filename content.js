alert("ciao1");

function getHighlightedText() {
    let selection = window.getSelection();
    return selection.toString();
}

async function getOpenAIResponse(prompt) {
    let response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // Replace API_KEY with your OpenAI API key
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 100,
            n: 1,
            stop: '\n',
            temperature: 0.7
        })
    });

    let data = await response.json();
    return data.choices[0].text.trim();
}

document.addEventListener('mouseup', async function () {
    let highlightedText = getHighlightedText();

    if (highlightedText.length > 0) {
        let response = await getOpenAIResponse(highlightedText);
        alert(response); 
    }
});