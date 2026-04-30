import { getDb, json, error } from "./lib/db.mjs";
import { handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "GET") return error("Method not allowed", 405);

  const url = new URL(request.url);
  const all = url.searchParams.get("all");

  const db = await getDb();
  const filter = all === "true" ? {} : { enabled: { $ne: false } };
  const tools = await db.collection("tools").find(filter).sort({ order: 1 }).toArray();
  return json(tools);
};
