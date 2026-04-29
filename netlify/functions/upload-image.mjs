import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

// Stores image as base64 in a separate 'images' collection
// Returns the image ID to reference in project/profile/tool documents
export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "POST") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  const { data, name, type } = await request.json();
  // data = base64 string (e.g. "data:image/png;base64,iVBOR...")
  if (!data) return error("Missing image data");

  const sizeInBytes = Math.ceil((data.length * 3) / 4);
  if (sizeInBytes > 5 * 1024 * 1024) return error("Image too large (max 5MB)");

  const db = await getDb();
  const result = await db.collection("images").insertOne({
    data,
    name: name || "untitled",
    type: type || "image/png",
    createdAt: new Date().toISOString(),
  });

  return json({ id: result.insertedId.toString() }, 201);
};
