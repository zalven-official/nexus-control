import ChatGPTTextbox from "@/components/chat/chatbox"
import type { ChatMessageFormat, MessageContent } from "@/types"



interface Chat {
  chatGPTState: ChatMessageFormat;
  setChatGPTState: React.Dispatch<React.SetStateAction<ChatMessageFormat>>;
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
          <img src={content.image_url.url || "/placeholder.svg"} alt="User uploaded" className="w-52 h-auto rounded-lg" />
        )
      case "audio":
        return <audio controls src={content.audio_url.url} className="w-96" />
      case "code":
        return (
          <pre className="bg-inherit p-2 rounded">
            <code>{content.code}</code>
          </pre>
        )
      default:
        return null
    }
  }
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-grow overflow-auto p-4 pb-24">
        {chatGPTState.messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded-lg flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`w-auto p-2 rounded-sm ${msg.role === 'user' ? 'bg-muted' : 'items-start'}`}>
              {
                msg.role !== 'user' ? (
                  <p className="font-bold mt-1 capitalize text-xs opacity-50">{msg.role}:</p>
                ) : null
              }
              {msg.content.map((content, contentIndex) => (
                <div key={contentIndex} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {renderMessage(content)}
                </div>
              ))}
            </div>

          </div>

        ))}
      </div>
      <ChatGPTTextbox model={chatGPTState.model} submit={submit} isLoading={isLoading} />
    </div>
  )
}

export default Chat;
