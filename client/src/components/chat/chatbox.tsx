"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendHorizontal } from "lucide-react"

interface ChatboxProps {
  model: string;
  submit: (message: string, files: Array<File>) => void;
  isLoading: boolean;
}

const Chatbox: React.FC<ChatboxProps> = ({ submit, isLoading }) => {
  const [message, setMessage] = useState<string>("")
  const [files, setFiles] = useState<Array<File>>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [textareaRef])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      submit(message, files)
      setMessage("")
      setFiles([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background border-t border-border p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col items-end">
        <div className="flex w-full items-center space-x-2">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={"What can I help with?"}
            className="flex-grow overflow-hidden min-h-[40px] w-full pr-10"
            rows={1}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="submit"
            size="icon"
            className="right-2 bottom-2 rounded-full"
            disabled={!message.trim() || isLoading}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        {files.length > 0 && <div className="mt-2 text-sm text-gray-500">{files.length} file(s) selected</div>}
      </form>
    </div>
  )
}

export default Chatbox
