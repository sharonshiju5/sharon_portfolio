import { getDb, json, error } from "./lib/db.mjs";
import { handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "GET") return error("Method not allowed", 405);

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return error("Missing project id");

  const db = await getDb();
  const project = await db.collection("projects").findOne({ projectId: id });
  if (!project) return error("Project not found", 404);
  return json(project);
};
