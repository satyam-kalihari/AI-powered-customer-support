import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentChats() {
  // This would typically fetch data from an API
  const chats = [
    {
      id: "1",
      customer: {
        name: "Alex Thompson",
        email: "alex@example.com",
      },
      preview: "I need help with setting up my account",
      sentiment: "neutral",
      time: "10 minutes ago",
    },
    {
      id: "2",
      customer: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
      },
      preview: "Thank you for the quick response!",
      sentiment: "positive",
      time: "25 minutes ago",
    },
    {
      id: "3",
      customer: {
        name: "Michael Brown",
        email: "michael@example.com",
      },
      preview: "This is still not working after I tried your suggestion",
      sentiment: "negative",
      time: "1 hour ago",
    },
    {
      id: "4",
      customer: {
        name: "Emily Davis",
        email: "emily@example.com",
      },
      preview: "How do I upgrade my subscription?",
      sentiment: "neutral",
      time: "2 hours ago",
    },
  ]

  return (
    <div className="space-y-4">
      {chats.map((chat) => (
        <div key={chat.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{chat.customer.name.charAt(0)}</AvatarFallback>
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{chat.customer.name}</p>
              <SentimentBadge sentiment={chat.sentiment} />
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{chat.preview}</p>
            <p className="text-xs text-muted-foreground">{chat.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const variants: Record<string, { className: string; label: string }> = {
    positive: {
      className: "bg-green-100 text-green-800 hover:bg-green-100",
      label: "Positive",
    },
    neutral: {
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      label: "Neutral",
    },
    negative: {
      className: "bg-red-100 text-red-800 hover:bg-red-100",
      label: "Negative",
    },
  }

  const { className, label } = variants[sentiment] || variants.neutral

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}

