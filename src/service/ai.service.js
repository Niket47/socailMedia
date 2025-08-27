const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const GEMINI_API_KEY = "AIzaSyAkY-rENeSaXtgE4Ybb24xguShU8sEpHHk"
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}

main();

const generateCaption = async (base64ImageFile) => {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
                You are an AI that generates captions for images. 
                you generate single caption for image 
                use hashtag in captions caption should be short
                `,
        },
    });
    console.log(response.text,"---response.text");
    return response.text
}

module.exports = generateCaption;