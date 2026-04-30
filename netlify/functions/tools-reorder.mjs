import { ObjectId } from "mongodb";
import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "PUT") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  // Expects { order: ["id1", "id2", "id3"] }
  const { order } = await request.json();
  if (!Array.isArray(order)) return error("Missing order array");

  const db = await getDb();
  const ops = order.map((id, i) => ({
    updateOne: {
      filter: { _id: new ObjectId(id) },
      update: { $set: { order: i + 1 } },
    },
  }));

  await db.collection("tools").bulkWrite(ops);
  return json({ success: true });
};
