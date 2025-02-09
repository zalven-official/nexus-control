"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SendHorizontal, Image, Mic, Code, Paperclip } from "lucide-react"

interface ChatGPTTextboxProps {
  model: string;
  submit: (message: string, files: Array<File>) => void;
  isLoading: boolean;
}

const ChatGPTTextbox: React.FC<ChatGPTTextboxProps> = ({ submit, isLoading }) => {
  const [message, setMessage] = useState<string>("")
  const [contentType, setContentType] = useState<"text" | "image_url" | "audio" | "code">("text")
  const [files, setFiles] = useState<Array<File>>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background border-t border-border p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col items-end">
        <div className="w-full flex items-center mb-2">
          <Button
            type="button"
            size="icon"
            variant={contentType === "text" ? "default" : "outline"}
            className="mr-2"
            onClick={() => setContentType("text")}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={contentType === "image_url" ? "default" : "outline"}
            className="mr-2"
            onClick={() => setContentType("image_url")}
          >
            <Image className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={contentType === "audio" ? "default" : "outline"}
            className="mr-2"
            onClick={() => setContentType("audio")}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={contentType === "code" ? "default" : "outline"}
            className="mr-2"
            onClick={() => setContentType("code")}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button type="button" size="icon" variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
        </div>
        <div className="w-full relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              contentType === "text"
                ? "Type your message here..."
                : contentType === "image_url"
                  ? "Enter image URL..."
                  : contentType === "audio"
                    ? "Enter audio URL..."
                    : "Enter your code here..."
            }
            className="flex-grow resize-none overflow-hidden min-h-[40px] max-h-[200px] pr-10"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 bottom-2 rounded-full"
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

export default ChatGPTTextbox

