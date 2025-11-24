import { GoogleGenAI } from '@google/genai';

//Uses the GEMINI_API_KEY environment variable automatically
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export { ai };
