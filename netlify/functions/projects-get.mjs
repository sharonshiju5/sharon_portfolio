import { getDb, json, error } from "./lib/db.mjs";
import { handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "GET") return error("Method not allowed", 405);

  const url = new URL(request.url);
  const all = url.searchParams.get("all"); // admin passes ?all=true

  const db = await getDb();
  const filter = all === "true" ? {} : { status: "published" };
  const projects = await db.collection("projects").find(filter).sort({ order: 1 }).toArray();
  return json(projects);
};
