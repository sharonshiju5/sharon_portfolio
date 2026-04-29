import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "PUT") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  const { projectId, status } = await request.json();
  if (!projectId || !["draft", "published"].includes(status)) {
    return error("Invalid projectId or status");
  }

  const db = await getDb();
  const result = await db.collection("projects").updateOne(
    { projectId },
    { $set: { status, updatedAt: new Date().toISOString() } }
  );

  if (result.matchedCount === 0) return error("Project not found", 404);
  return json({ success: true });
};
