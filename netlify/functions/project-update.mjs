import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "PUT") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  const body = await request.json();
  if (!body.projectId) return error("Missing projectId");

  const db = await getDb();
  const { projectId, ...updates } = body;
  updates.updatedAt = new Date().toISOString();

  const result = await db.collection("projects").updateOne(
    { projectId },
    { $set: updates }
  );

  if (result.matchedCount === 0) return error("Project not found", 404);
  return json({ success: true });
};
