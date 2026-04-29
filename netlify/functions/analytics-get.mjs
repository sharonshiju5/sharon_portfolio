import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "GET") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  const db = await getDb();
  const analytics = await db.collection("analytics").find().sort({ date: -1 }).limit(30).toArray();
  const totalProjects = await db.collection("projects").countDocuments();
  const totalTools = await db.collection("tools").countDocuments();
  const totalVisitors = analytics.reduce((sum, a) => sum + (a.visitors || 0), 0);

  return json({ analytics, totalProjects, totalTools, totalVisitors });
};
