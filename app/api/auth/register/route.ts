// app/api/auth/register/route.ts
import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb"; // adjust path as needed
import { ObjectId } from "mongodb";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Register request body:", body);

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(); // optionally pass DB name like db("mydb")

    // Insert into users collection
    const passwordHash = await hashPassword(password);
    const result = await db.collection("users").insertOne({
      _id: new ObjectId(),
      name,
      email,
      passwordHash, // optionally hash before storing
      createdAt: new Date(),
    });

    console.log("User inserted with ID:", result.insertedId);

    return Response.json(
      { message: "User registered successfully", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
