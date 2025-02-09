import ChatGPTTextbox from "@/components/chat/chatbox"
import type { ChatGPT, MessageContent } from "@/types"

interface Chat {
  chatGPTState: ChatGPT;
  setChatGPTState: React.Dispatch<React.SetStateAction<ChatGPT>>;
  submit: (message: string, files: Array<File>) => void;
  isLoading: boolean;
}

const Chat: React.FC<Chat> = ({ chatGPTState, submit, isLoading }) => {

  const renderMessage = (content: MessageContent) => {
    switch (content.type) {
      case "text":
        return <p>{content.text}</p>
      case "image_url":
        return (
          <img src={content.image_url.url || "/placeholder.svg"} alt="User uploaded" className="max-w-full h-auto" />
        )
      case "audio":
        return <audio controls src={content.audio_url.url} className="w-full" />
      case "code":
        return (
          <pre className="bg-gray-100 p-2 rounded">
            <code>{content.code}</code>
          </pre>
        )
      default:
        return null
    }
  }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-grow overflow-auto p-4 pb-32">
        {chatGPTState.messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded-lg ${msg.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"}`}
          >
            <p className="font-bold mb-1">{msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}:</p>
            {msg.content.map((content, contentIndex) => (
              <div key={contentIndex} className="mb-2">
                {renderMessage(content)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <ChatGPTTextbox model={chatGPTState.model} submit={submit} isLoading={isLoading} />
    </div>
  )
}

export default Chat;
