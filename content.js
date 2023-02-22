alert("ciao1");

function getHighlightedText() {
    let selection = window.getSelection();
    return selection.toString();
}

document.addEventListener('mouseup', async function () {
    let highlightedText = getHighlightedText();
    alert(highlightedText);
    if (highlightedText.length > 0) {
        let response = generateAiResponse(highlightedText);
        alert(response);
    }
});

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please go to .env file",
            }
        });
        return;
    }


    async function generateAiResponse(query) {
        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: query,
                temperature: 0.6,
            });
            res.status(200).json({ result: completion.data.choices[0].text });
        } catch (error) {
            if (error.response) {
                console.error(error.response.status, error.response.data);
                res.status(error.response.status).json(error.response.data);
            } else {
                console.error(`Error with OpenAI API request: ${error.message}`);
                res.status(500).json({
                    error: {
                        message: 'An error occurred during your request.',
                    }
                });
            }
        }
    }

}


// async function getOpenAIResponse(prompt) {
//     let response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer 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' // Replace API_KEY with your OpenAI API key
//         },
//         body: JSON.stringify({
//             prompt: prompt,
//             max_tokens: 100,
//             n: 1,
//             stop: '\n',
//             temperature: 0.7
//         })
//     });

//     let data = await response.json();
//     return data.choices[0].text.trim();
// }