import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { Client } from "pg";

export const syncUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { firebase_uid, email,displayName } = req.body as {
    firebase_uid: string;
    email: string;
    displayName:string
  };
  const client = (req.server as FastifyInstance & { pg: Client }).pg;

  try {
    // Check if user already exists by firebase_uid
    const result = await client.query(
      "SELECT * FROM users WHERE firebase_uid = $1",
      [firebase_uid]
    );
    if (result.rows.length > 0) {
      return reply.send({ message: "User already exists" });
    }

    // Insert new user (UUID will be auto-generated)
    await client.query(
      "INSERT INTO users (firebase_uid, email,full_name, created_at) VALUES ($1, $2, $3, NOW())",
      [firebase_uid, email,displayName]
    );

    reply.send({ message: "User synced successfully" });
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: "Error syncing user", detail: err });
  }
};

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  const client = (req.server as FastifyInstance & { pg: Client }).pg;

  try {
    const result = await client.query("SELECT * FROM users");
    reply.send(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    reply.status(500).send({ error: "Failed to fetch users" });
  }
};
