import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { Client } from "pg";

export const createTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { title, description, owner_id } = req.body as {
    title: string;
    description: string;
    owner_id: string;
  };

  const client = (req.server as FastifyInstance & { pg: Client }).pg;

  try {
    const result = await client.query(
      `INSERT INTO tasks (title, description, owner_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [title, description, owner_id]
    );

    reply.code(201).send({
      message: "Task created successfully",
      task: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Error creating task", detail: error });
  }
};

export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const { filter, user_id } = req.query as {
    filter?: "shared";
    user_id?: string;
  };

  const client = (req.server as FastifyInstance & { pg: Client }).pg;

  try {
    let query = "SELECT * FROM tasks";
    let params: any[] = [];

    if (filter === "shared" && user_id) {
      query = `
        SELECT t.*
        FROM tasks t
        JOIN task_assignees ta ON t.id = ta.task_id
        WHERE ta.user_id = $1
      `;
      params = [user_id];
    } else if (user_id && !filter) {
      query = "SELECT * FROM tasks WHERE owner_id = $1";
      params = [user_id];
    }

    const result = await client.query(query, params);
    reply.send(result.rows);
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: "Error fetching tasks", detail: err });
  }
};
