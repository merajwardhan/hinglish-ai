import { ai } from '../config/gemini.config.js';

const chat = ai.chats.create({ model: "gemini-2.5-flash"});

async function sendMessage(Message) {
  try {
    const response = await chat.sendMessage({ message: Message });
    return response.text;
  } catch (error) {
    console.error(`Something went wrong, This is the error => ${error}`)
    throw new Error("Failed to get response from AI!");
  }
}

export default {
  sendMessage,
  //More export here as the services increase (StartNewChatSession, getHistory, etc)
}
