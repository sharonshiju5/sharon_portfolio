import { getDb, json, error } from "./lib/db.mjs";
import { requireAuth, handleOptions } from "./lib/auth.mjs";

export default async (request) => {
  if (request.method === "OPTIONS") return handleOptions();
  if (request.method !== "PUT") return error("Method not allowed", 405);

  const authError = requireAuth(request);
  if (authError) return authError;

  const body = await request.json();
  const db = await getDb();

  await db.collection("profile").updateOne(
    {},
    { $set: { ...body, updatedAt: new Date().toISOString() } },
    { upsert: true }
  );

  return json({ success: true });
};
