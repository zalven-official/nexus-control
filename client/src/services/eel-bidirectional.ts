import { ChatMessageFormat } from "@/types";

export interface Eel {
  /**
   * Exposes a JavaScript function to Python.
   * 
   * @param func The function to be exposed to Python.
   * @param name The optional name for the function. If not provided, the function name is used.
   */
  expose: <T>(func: (data: T) => void, name?: string) => void;

  // Bidirectional Methods
  ping: () => () => Promise<string>;
  text_to_speech: (text: string) => () => Promise<string>;
  speech_to_text: (audio: string) => () => Promise<string>;
  text_chat_completion: (chatMessage: ChatMessageFormat) => () => Promise<ChatMessageFormat>;
  vision_chat_completion: (imageData: string) => () => Promise<string>;
}

export const ping = async (): Promise<string> => {
  try {
    return await window.eel.ping()();  // Call the ping method
  } catch (error) {
    console.error("Error calling eel.ping:", error);
    throw error;
  }
};

export const textToSpeech = async (text: string): Promise<string> => {
  try {
    return await window.eel.text_to_speech(text)();
  } catch (error) {
    console.error("Error calling eel.text_to_speech:", error);
    throw error;
  }
};

export const speechToText = async (audio: string): Promise<string> => {
  try {
    return await window.eel.speech_to_text(audio)();
  } catch (error) {
    console.error("Error calling eel.speech_to_text:", error);
    throw error;
  }
};

export const textChatCompletion = async (chatMessage: ChatMessageFormat): Promise<ChatMessageFormat> => {
  try {

    return await window.eel.text_chat_completion(chatMessage)();
  } catch (error) {
    console.error("Error calling eel.text_chat_completion:", error);
    throw error;
  }
};

export const visionChatCompletion = async (imageData: string): Promise<string> => {
  try {
    return await window.eel.vision_chat_completion(imageData)();
  } catch (error) {
    console.error("Error calling eel.vision_chat_completion:", error);
    throw error;
  }
};
