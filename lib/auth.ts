// lib/auth.ts
import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { User } from "./models/user";
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

// Verify password
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(user: Partial<User>): string {
  return sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Set auth cookie
export async function setAuthCookie(token: string): Promise<void> {
  (await cookies()).set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Get auth cookie
export async function getAuthCookie(): Promise<string | undefined> {
  return (await cookies()).get("auth_token")?.value;
}

// Clear auth cookie
export async function clearAuthCookie(): Promise<void> {
  (await cookies()).delete("auth_token");
}

// Get current user from token
export async function getCurrentUser(): Promise<User | null> {
  const token = await getAuthCookie();

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);

  if (!decoded || !decoded.id) {
    return null;
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(decoded.id) });

    if (!user) {
      return null;
    }

    return user as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
