import { FastifyInstance } from "fastify";
import { Client } from "pg";
import fp from "fastify-plugin";

async function dbConnector(fastify: FastifyInstance) {

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    fastify.decorate("pg", client);

    console.log("Connected to Supabase Postgres");
  } catch (err) {
    fastify.log.error("Failed to connect to DB", err);
    throw err;
  }
}

export default fp(dbConnector);
