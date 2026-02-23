import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API key is available
if (!process.env.API_KEY) {
  console.error("API_KEY environment variable is missing.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const streamGeminiResponse = async (
  prompt: string,
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      config: {
        // Optional: Add system instructions or safety settings here
        systemInstruction: "You are a helpful, concise, and knowledgeable AI assistant.",
      }
    });

    for await (const chunk of responseStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};