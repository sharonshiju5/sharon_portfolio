import { ObjectId } from "mongodb";
import { getDb, error } from "./lib/db.mjs";
import { handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "GET") return error("Method not allowed", 405);

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return error("Missing image id");

  const db = await getDb();
  let image;
  try {
    image = await db.collection("images").findOne({ _id: new ObjectId(id) });
  } catch {
    return error("Invalid image id", 400);
  }

  if (!image) return error("Image not found", 404);

  // Convert base64 data URL to binary
  const base64 = image.data.replace(/^data:[^;]+;base64,/, "");
  const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

  return new Response(binary, {
    status: 200,
    headers: {
      "Content-Type": image.type || "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
