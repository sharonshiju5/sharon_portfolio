import { ObjectId } from "mongodb";
import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "DELETE") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return error("Missing image id");

  const db = await getDb();
  await db.collection("images").deleteOne({ _id: new ObjectId(id) });
  return json({ success: true });
};
