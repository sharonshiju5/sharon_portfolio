import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "POST") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  const body = await request.json();
  const db = await getDb();

  const count = await db.collection("tools").countDocuments();
  const tool = {
    name: body.name || "",
    icon: body.icon || "",
    order: count + 1,
  };

  const result = await db.collection("tools").insertOne(tool);
  return json({ ...tool, _id: result.insertedId }, 201);
};
