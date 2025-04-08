"use client"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Customer Support Chat"
        text="Interact with our AI-powered customer support assistant."
      />

      <Card className="flex flex-col h-[calc(100vh-220px)]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-indigo-500" />
            AI Support Assistant
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-full p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Bot className="h-16 w-16 text-indigo-200 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Welcome to AI Support</h3>
                <p className="text-muted-foreground max-w-md">
                  How can I help you today? Ask me anything about our products, services, or any issues you're
                  experiencing.
                </p>
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-start gap-3 max-w-[80%]">
                      {message.role !== "user" && (
                        <Avatar>
                          <AvatarFallback className="bg-indigo-100 text-indigo-800">AI</AvatarFallback>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <Avatar>
                          <AvatarFallback className="bg-indigo-600 text-white">U</AvatarFallback>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>

        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}

