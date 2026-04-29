import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "POST") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  const body = await request.json();
  const db = await getDb();

  const count = await db.collection("projects").countDocuments();
  const project = {
    projectId: body.projectId || body.name.toLowerCase().replace(/\s+/g, "-"),
    name: body.name || "",
    shortDesc: body.shortDesc || "",
    category: body.category || "",
    year: body.year || new Date().getFullYear().toString(),
    coverImg: body.coverImg || "",
    gallery: body.gallery || [],
    techStack: body.techStack || [],
    description: body.description || "",
    features: body.features || [],
    challenges: body.challenges || "",
    githubLink: body.githubLink || "",
    liveLink: body.liveLink || "",
    status: body.status || "draft",
    views: 0,
    clicks: 0,
    order: count + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = await db.collection("projects").insertOne(project);
  return json({ ...project, _id: result.insertedId }, 201);
};
