"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Plus } from "lucide-react"

// Sample ticket data
const TICKETS = [
  {
    id: "TKT-1001",
    subject: "Cannot access my account after password reset",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
    },
    status: "open",
    priority: "high",
    category: "account",
    assignee: "Alex Wong",
    createdAt: "2025-04-01T10:23:45Z",
    updatedAt: "2025-04-01T14:30:00Z",
  },
  {
    id: "TKT-1002",
    subject: "How do I upgrade my subscription plan?",
    customer: {
      name: "Michael Chen",
      email: "michael@example.com",
    },
    status: "open",
    priority: "medium",
    category: "billing",
    assignee: "Unassigned",
    createdAt: "2025-04-01T11:45:12Z",
    updatedAt: "2025-04-01T11:45:12Z",
  },
  {
    id: "TKT-1003",
    subject: "Feature request: Dark mode for dashboard",
    customer: {
      name: "Emily Rodriguez",
      email: "emily@example.com",
    },
    status: "in-progress",
    priority: "low",
    category: "feature",
    assignee: "Taylor Swift",
    createdAt: "2025-04-01T13:12:33Z",
    updatedAt: "2025-04-02T09:20:15Z",
  },
  {
    id: "TKT-1004",
    subject: "Integration with Salesforce not working",
    customer: {
      name: "David Kim",
      email: "david@example.com",
    },
    status: "open",
    priority: "high",
    category: "technical",
    assignee: "Alex Wong",
    createdAt: "2025-04-01T14:30:00Z",
    updatedAt: "2025-04-01T16:45:22Z",
  },
  {
    id: "TKT-1005",
    subject: "Thank you for the quick response!",
    customer: {
      name: "Lisa Thompson",
      email: "lisa@example.com",
    },
    status: "closed",
    priority: "medium",
    category: "other",
    assignee: "Taylor Swift",
    createdAt: "2025-04-01T15:45:22Z",
    updatedAt: "2025-04-02T10:15:30Z",
  },
  {
    id: "TKT-1006",
    subject: "API documentation is outdated",
    customer: {
      name: "James Wilson",
      email: "james@example.com",
    },
    status: "in-progress",
    priority: "medium",
    category: "technical",
    assignee: "Alex Wong",
    createdAt: "2025-04-01T16:20:10Z",
    updatedAt: "2025-04-02T11:30:45Z",
  },
  {
    id: "TKT-1007",
    subject: "Billing cycle changed without notification",
    customer: {
      name: "Olivia Martinez",
      email: "olivia@example.com",
    },
    status: "open",
    priority: "high",
    category: "billing",
    assignee: "Unassigned",
    createdAt: "2025-04-01T17:05:45Z",
    updatedAt: "2025-04-01T17:05:45Z",
  },
]

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filter tickets based on search query and filters
  const filteredTickets = TICKETS.filter((ticket) => {
    const matchesSearch =
      searchQuery === "" ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Tickets" text="Manage and respond to customer support tickets">
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Ticket
        </Button>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>View and manage all customer support tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tickets..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="feature">Feature</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{ticket.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{ticket.customer.name.charAt(0)}</AvatarFallback>
                            <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                          </Avatar>
                          <span className="truncate max-w-[100px]">{ticket.customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={ticket.status} />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={ticket.priority} />
                      </TableCell>
                      <TableCell className="capitalize">{ticket.category}</TableCell>
                      <TableCell>{ticket.assignee}</TableCell>
                      <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Assign ticket</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Change status</DropdownMenuItem>
                            <DropdownMenuItem>Change priority</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Close ticket</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { className: string; label: string }> = {
    open: {
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      label: "Open",
    },
    "in-progress": {
      className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
      label: "In Progress",
    },
    closed: {
      className: "bg-green-100 text-green-800 hover:bg-green-100",
      label: "Closed",
    },
  }

  const { className, label } = variants[status] || variants.open

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
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

