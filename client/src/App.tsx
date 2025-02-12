import { useEffect, useState } from "react";
import { ChatMessageFormat, ChatMessage } from "./types";
import Chat from "./components/chat";
import { expose, textChatCompletion } from "@/services";



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatGPTState, setChatGPTState] = useState<ChatMessageFormat>({
    model: "gpt-4-turbo",
    max_tokens: 2048,
    messages: []
  });


  useEffect(() => {
    if (window.eel) {
      expose()
    }
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (message: string, _files: Array<File>) => {
    try {
      setIsLoading(true);
      const newMessage: ChatMessage = {
        role: "user",
        content: [{ type: "text", text: message }],
      };
      const updatedChatGPTState: ChatMessageFormat = {
        ...chatGPTState,
        messages: [...chatGPTState.messages, newMessage],
      };
      setChatGPTState(updatedChatGPTState);
      const data: ChatMessageFormat = await textChatCompletion(updatedChatGPTState);
      setChatGPTState(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Chat
      chatGPTState={chatGPTState}
      setChatGPTState={setChatGPTState}
      submit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

export default App;
