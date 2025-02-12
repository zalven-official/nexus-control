export interface TextMessage {
  type: 'text';
  text: string;
}

export interface ImageURL {
  type: 'image_url';
  image_url: {
    url: string;
  };
}

export interface AudioMessage {
  type: 'audio';
  audio_url: {
    url: string;
  };
}

export interface CodeMessage {
  type: 'code';
  code: string;
}

export type MessageContent = TextMessage | ImageURL | AudioMessage | CodeMessage;

export interface ChatMessage {
  role: 'user' | 'assistant' | 'developer';
  content: MessageContent[];
}

export interface ChatMessageFormat {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
  store?: boolean;
}
