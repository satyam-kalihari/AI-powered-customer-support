// lib/mongodb.ts
import { MongoClient, ServerApiVersion } from "mongodb";

// This prevents the MongoDB client from being bundled with client code
if (typeof window !== "undefined") {
  throw new Error("This module should not be imported in client components");
}

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {
  // serverApi: {
  //   version: ServerApiVersion.v1,
  //   strict: true,
  //   deprecationErrors: true,
  // },
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
