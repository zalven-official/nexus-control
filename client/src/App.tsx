import { useState } from "react";
import { ChatGPT, ChatMessage } from "./types";
import Chat from "./components/chat";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatGPTState, setChatGPTState] = useState<ChatGPT>({
    model: "gpt-4-turbo",
    messages: [],
  });

  const handleSubmit = (message: string, files: Array<File>) => {
    setIsLoading(true);

    const newMessage: ChatMessage = {
      role: "user",
      content: [{ type: "text", text: message }],
    };

    setChatGPTState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));

    setIsLoading(false);
    console.log(message);
    console.log(files);
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
