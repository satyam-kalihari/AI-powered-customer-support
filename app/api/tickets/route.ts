import type { NextRequest } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"

// Mock database for tickets
const tickets = [
  {
    id: "1",
    subject: "Cannot access my account",
    description: "I've been trying to log in for the past hour but keep getting an error message.",
    status: "open",
    priority: "high",
    category: "account",
    createdAt: "2023-04-01T10:30:00Z",
    customer: {
      id: "cust_123",
      name: "John Doe",
      email: "john@example.com",
    },
  },
  {
    id: "2",
    subject: "Billing question",
    description: "I was charged twice for my subscription this month. Can you help me resolve this?",
    status: "open",
    priority: "medium",
    category: "billing",
    createdAt: "2023-04-02T14:20:00Z",
    customer: {
      id: "cust_456",
      name: "Jane Smith",
      email: "jane@example.com",
    },
  },
  {
    id: "3",
    subject: "Feature request",
    description: "It would be great if you could add dark mode to the dashboard.",
    status: "pending",
    priority: "low",
    category: "feature",
    createdAt: "2023-04-03T09:15:00Z",
    customer: {
      id: "cust_789",
      name: "Bob Johnson",
      email: "bob@example.com",
    },
  },
]

export async function GET() {
  return Response.json({ tickets })
}

export async function POST(req: NextRequest) {
  const { subject, description, customer } = await req.json()

  if (!subject || !description || !customer) {
    return Response.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    // Use AI to categorize and prioritize the ticket
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: ["account", "billing", "technical", "feature", "other"],
            description: "The category of the support ticket",
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high", "urgent"],
            description: "The priority level of the ticket",
          },
          suggestedResponse: {
            type: "string",
            description: "A suggested response to the customer",
          },
        },
        required: ["category", "priority", "suggestedResponse"],
      },
      prompt: `Categorize and prioritize this support ticket:
        Subject: ${subject}
        Description: ${description}
      `,
    })

    // Create new ticket with AI-generated fields
    const newTicket = {
      id: String(tickets.length + 1),
      subject,
      description,
      status: "open",
      priority: object.priority,
      category: object.category,
      createdAt: new Date().toISOString(),
      customer,
      suggestedResponse: object.suggestedResponse,
    }

    tickets.push(newTicket)

    return Response.json({ ticket: newTicket })
  } catch (error) {
    console.error("Error creating ticket:", error)
    return Response.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}

