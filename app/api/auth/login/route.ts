import type { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyPassword, generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return Response.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Find user
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user);

    // Set auth cookie using Next.js cookies() API
    setAuthCookie(token);

    // Return success response
    return Response.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      redirectUrl: "/dashboard",
    });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
