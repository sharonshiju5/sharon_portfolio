import { ObjectId } from "mongodb";
import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "PUT") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  const body = await request.json();
  if (!body._id) return error("Missing tool _id");

  const db = await getDb();
  const { _id, ...updates } = body;

  const result = await db.collection("tools").updateOne(
    { _id: new ObjectId(_id) },
    { $set: updates }
  );

  if (result.matchedCount === 0) return error("Tool not found", 404);
  return json({ success: true });
};
