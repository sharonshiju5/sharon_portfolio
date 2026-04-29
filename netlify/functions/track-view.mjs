import { getDb, json, error } from "./lib/db.mjs";
import { handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "POST") return error("Method not allowed", 405);

  const { projectId } = await request.json();
  if (!projectId) return error("Missing projectId");

  const db = await getDb();
  await db.collection("projects").updateOne(
    { projectId },
    { $inc: { views: 1 } }
  );

  return json({ success: true });
};
