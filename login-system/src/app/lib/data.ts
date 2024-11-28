import { createClient } from "@vercel/postgres";

export async function connectDB() {
  const client = createClient();
  await client.connect();

  try {
    if (client) {
      console.log("Connected to database");
    }
  } catch (err) {
    console.error(err);
  }
}
