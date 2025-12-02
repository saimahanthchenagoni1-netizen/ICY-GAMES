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
