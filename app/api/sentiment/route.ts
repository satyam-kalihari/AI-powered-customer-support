import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"

export async function POST(req: Request) {
  const { text } = await req.json()

  if (!text || typeof text !== "string") {
    return Response.json({ error: "Text is required" }, { status: 400 })
  }

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: {
        type: "object",
        properties: {
          sentiment: {
            type: "string",
            enum: ["positive", "neutral", "negative"],
            description: "The overall sentiment of the text",
          },
          score: {
            type: "number",
            description: "Sentiment score from -1 (very negative) to 1 (very positive)",
          },
          keyTopics: {
            type: "array",
            items: { type: "string" },
            description: "Key topics or issues mentioned in the text",
          },
          urgency: {
            type: "string",
            enum: ["low", "medium", "high"],
            description: "The urgency level of the customer issue",
          },
        },
        required: ["sentiment", "score", "keyTopics", "urgency"],
      },
      prompt: `Analyze the sentiment, key topics, and urgency of the following customer message: "${text}"`,
    })

    return Response.json(object)
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    return Response.json({ error: "Failed to analyze sentiment" }, { status: 500 })
  }
}

