
import { GoogleGenAI } from "@google/genai";
import { Game } from '../types';

let genAI: GoogleGenAI | null = null;

// Debug check for API Key availability (Do not log the actual key in production!)
const hasApiKey = !!process.env.API_KEY;
if (!hasApiKey) {
    console.warn("Gemini API Key is missing. Features using AI will not work. Please set API_KEY in your environment variables.");
} else {
    try {
        genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI client:", e);
    }
}

export const getGameAdvice = async (game: Game, question: string): Promise<string> => {
  if (!genAI) return "I apologize, but I am unable to connect to my knowledge base at the moment. (API Key missing).";

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `You are an expert gaming assistant for the game "${game.title}". 
    The game description is: "${game.description}".
    The user asks: "${question}".
    Provide a concise, helpful, and professional tip or answer in under 50 words.`;

    const response = await genAI.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "I apologize, I could not generate a tip at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, an error occurred while processing your request.";
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
  if (!genAI) return "I apologize, but I require an API Key to function correctly. Please verify your configuration.";

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
        systemInstruction: `You are Frosty, a sophisticated AI assistant for the ICY Games platform.
        
        Personality:
        - Extremely Formal & Polite: Always use complete sentences, proper grammar, and a respectful tone. (e.g., "Greetings," "How may I assist you?", "It would be my pleasure").
        - Professional & Precise: Do not use slang, casual abbreviations, or rude language.
        - Composed & Cool: Maintain a calm, collected, and highly intelligent demeanor.

        Capabilities:
        - You are capable of answering ANY question about ANY topic (games, science, history, coding, general knowledge, etc.).
        - Do not limit yourself to gaming topics if the user asks about something else.
        - Ensure your responses are helpful, comprehensive, and strictly bug-free.
        
        Goal:
        - Provide the highest standard of assistance to the user.`,
      }
    });

    return response.text || "I apologize, but I was unable to generate a response.";
  } catch (error) {
    console.error("Frost AI Error:", error);
    return "I apologize, but I encountered a connection error. Please try again later.";
  }
};
