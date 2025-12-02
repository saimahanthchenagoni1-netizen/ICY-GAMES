import { GoogleGenAI } from "@google/genai";
import { Game } from '../types';

let genAI: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const getGameAdvice = async (game: Game, question: string): Promise<string> => {
  if (!genAI) return "Sorry, AI features are currently unavailable. Please check your API key.";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `You are an expert gaming assistant for the game "${game.title}". 
    The game description is: "${game.description}".
    The user asks: "${question}".
    Provide a short, fun, and helpful tip or answer in under 50 words. Be enthusiastic!`;

    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "I couldn't think of a tip right now, but good luck!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! My brain froze. Try again later.";
  }
};

export const getRecommendedGame = async (games: Game[], mood: string): Promise<string> => {
  if (!genAI) return "";

  try {
     const gameList = games.map(g => `${g.title} (${g.category})`).join(', ');
     const prompt = `I have these games: ${gameList}. 
     The user is in the mood for: "${mood}". 
     Pick the single best match from the list. Return ONLY the exact game title.`;

     const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text?.trim() || "";
  } catch (e) {
    return "";
  }
}

export const chatWithFrost = async (message: string, imageBase64?: string): Promise<string> => {
  if (!genAI) return "My circuits are frozen (API Key missing).";

  try {
    const contents: any = [
      { 
        role: 'user', 
        parts: [
          { text: message }
        ] 
      }
    ];

    if (imageBase64) {
      // Remove data:image/jpeg;base64, prefix if present
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
      contents[0].parts.push({
        inlineData: {
          mimeType: 'image/png', // Defaulting to png, gemini handles most common types
          data: cleanBase64
        }
      });
    }

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: "You are FROST AI, a cool, witty, and helpful assistant for the ICY Games platform. You love gaming, technology, and making ice puns. You are helpful, concise, and have a 'chill' personality.",
      }
    });

    return response.text || "I'm giving you the cold shoulder... (No response)";
  } catch (error) {
    console.error("Frost AI Error:", error);
    return "Brain freeze! Something went wrong.";
  }
};