import { getDb, json, error } from "./lib/db.mjs";
import { handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "POST") return error("Method not allowed", 405);

  const db = await getDb();
  const today = new Date().toISOString().split("T")[0];

  await db.collection("analytics").updateOne(
    { date: today },
    { $inc: { visitors: 1 } },
    { upsert: true }
  );

  return json({ success: true });
};
