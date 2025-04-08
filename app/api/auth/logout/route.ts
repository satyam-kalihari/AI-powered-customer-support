import { clearAuthCookie } from "@/lib/auth"

export async function POST() {
  // Clear auth cookie
  clearAuthCookie()

  // Return success
  return Response.json({ message: "Logged out successfully" }, { status: 200 })
}

