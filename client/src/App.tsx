import { useState, useEffect } from "react";
import { ChatGPT, ChatMessage } from "./types";
import Chat from "./components/chat";
import { ping } from "@/services";

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

  useEffect(() => {
    const checkPing = async () => {
      try {
        const response = await ping();
        console.log("Ping response:", response);
      } catch (error) {
        console.error("Ping failed:", error);
      }
    };

    checkPing();
  }, []);

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
