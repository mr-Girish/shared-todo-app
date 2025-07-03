import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { Client } from "pg";

export const shareTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { task_id, user_ids } = req.body as {
    task_id: string;
    user_ids: string[];
  };

  const client = (req.server as FastifyInstance & { pg: Client }).pg;

  try {
    for (const user_id of user_ids) {
      await client.query(
        `INSERT INTO shared_tasks (task_id, user_id) 
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [task_id, user_id]
      );
    }

    reply.send({ message: "Task shared successfully." });
  } catch (err) {
    reply.status(500).send({ error: "Error sharing task", detail: err });
  }
};


export const getUnsharedUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  const { task_id } = req.params as { task_id: string };
  const client = (req.server as FastifyInstance & { pg: Client }).pg;

  try {
    const result = await client.query(
      `SELECT * FROM users 
       WHERE id NOT IN (
         SELECT user_id FROM shared_tasks WHERE task_id = $1
       )`,
      [task_id]
    );

    reply.send(result.rows);
  } catch (err) {
    reply.status(500).send({ error: 'Failed to fetch users', detail: err });
  }
};