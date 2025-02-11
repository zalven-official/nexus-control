// eelInterface.ts

import { ChatMessageFormat } from "@/types";

export const ping = async (): Promise<string> => {
  try {
    const eelWindow = window as unknown as { eel: { ping: () => () => Promise<string> } };
    return await eelWindow.eel.ping()();
  } catch (error) {
    console.error("Error calling eel.ping:", error);
    throw error;
  }
};

export const textToSpeech = async (text: string): Promise<string> => {
  try {
    const eelWindow = window as unknown as { eel: { text_to_speech: (text: string) => () => Promise<string> } };
    return await eelWindow.eel.text_to_speech(text)();
  } catch (error) {
    console.error("Error calling eel.text_to_speech:", error);
    throw error;
  }
};

export const speechToText = async (audio: string): Promise<string> => {
  try {
    const eelWindow = window as unknown as { eel: { speech_to_text: (audio: string) => () => Promise<string> } };
    return await eelWindow.eel.speech_to_text(audio)();
  } catch (error) {
    console.error("Error calling eel.speech_to_text:", error);
    throw error;
  }
};

export const textChatCompletion = async (chatMessage: ChatMessageFormat): Promise<ChatMessageFormat> => {
  try {
    const eelWindow = window as unknown as { eel: { text_chat_completion: (chatMessage: ChatMessageFormat) => () => Promise<ChatMessageFormat> } };
    return await eelWindow.eel.text_chat_completion(chatMessage)();
  } catch (error) {
    console.error("Error calling eel.text_chat_completion:", error);
    throw error;
  }
};

export const visionChatCompletion = async (imageData: string): Promise<string> => {
  try {
    const eelWindow = window as unknown as { eel: { vision_chat_completion: (imageData: string) => () => Promise<string> } };
    return await eelWindow.eel.vision_chat_completion(imageData)();
  } catch (error) {
    console.error("Error calling eel.vision_chat_completion:", error);
    throw error;
  }
};
