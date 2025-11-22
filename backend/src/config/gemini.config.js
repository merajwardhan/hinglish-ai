import { GoogleGenAI } from '@google/genai';

//Uses the GEMINI_API_KEY environment variable automatically
const ai = GoogleGenAI({});

export { ai };
