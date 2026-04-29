import crypto from "crypto";
globalThis.crypto ??= crypto;
import { MongoClient } from "mongodb";

let cachedClient = null;

export async function getDb() {
  if (cachedClient) return cachedClient.db("portfolio_db");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client.db("portfolio_db");
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    },
  });
}

export function error(message, status = 400) {
  return json({ error: message }, status);
}
