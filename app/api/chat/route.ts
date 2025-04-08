// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get token from cookies
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;

    // Default system prompt if no user or service info
    let systemPrompt = `
      You are an AI customer support assistant.
      Your goal is to be helpful, friendly, and professional.
      Provide concise and accurate responses to customer inquiries.
      If you don't know the answer to a question, acknowledge that and offer to escalate to a human agent.
    `;

    // If user is authenticated, customize the prompt with their service info
    if (token) {
      try {
        // Verify token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
        const { payload } = await jwtVerify(token, secret);

        if (payload && payload.id) {
          const client = await clientPromise;
          const db = client.db();

          // Get service info for this user
          const serviceInfo = await db.collection("serviceInfo").findOne({
            userId: new ObjectId(payload.id as string),
          });

          if (serviceInfo) {
            // Create a customized system prompt based on the service info
            systemPrompt = createCustomizedPrompt(serviceInfo);
          }
        }
      } catch (error) {
        console.error("Error fetching service info:", error);
        // Continue with default prompt if there's an error
      }
    }

    const result = streamText({
      model: openai("gpt-4o"),
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return Response.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}

// Helper function to create a customized prompt based on service info
function createCustomizedPrompt(serviceInfo: any): string {
  let prompt = `
    You are an AI customer support assistant for ${serviceInfo.companyName}, a company in the ${serviceInfo.industry} industry.
    
    About the company and its services:
    ${serviceInfo.serviceDescription}
    
    Your goal is to be helpful, friendly, and professional.
    Provide concise and accurate responses to customer inquiries based on the company information above.
    If you don't know the answer to a question, acknowledge that and offer to escalate to a human agent.
  `;

  // Add FAQ information if available
  if (serviceInfo.faqItems && serviceInfo.faqItems.trim()) {
    prompt += `
      
      Frequently Asked Questions:
      ${serviceInfo.faqItems}
      
      Use the above FAQ information to answer common questions.
    `;
  }

  return prompt;
}
