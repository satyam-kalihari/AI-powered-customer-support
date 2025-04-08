import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TicketList() {
  // This would typically fetch data from an API
  const tickets = [
    {
      id: "1",
      subject: "Cannot access my account",
      status: "open",
      priority: "high",
      customer: {
        name: "John Doe",
        email: "john@example.com",
      },
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      subject: "Billing question",
      status: "open",
      priority: "medium",
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
      },
      createdAt: "4 hours ago",
    },
    {
      id: "3",
      subject: "Feature request",
      status: "pending",
      priority: "low",
      customer: {
        name: "Bob Johnson",
        email: "bob@example.com",
      },
      createdAt: "1 day ago",
    },
  ]

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{ticket.subject}</p>
              <PriorityBadge priority={ticket.priority} />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{ticket.customer.name}</span>
              <span className="mx-1">•</span>
              <span>{ticket.createdAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const variants: Record<string, { className: string; label: string }> = {
    low: {
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      label: "Low",
    },
    medium: {
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      label: "Medium",
    },
    high: {
      className: "bg-red-100 text-red-800 hover:bg-red-100",
      label: "High",
    },
  }

  const { className, label } = variants[priority] || variants.low

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}

