import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { Client } from "pg";

export const createTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { title, description, firebase_uid } = req.body as {
    title: string
    description: string
    firebase_uid: string
  }

  const client = (req.server as FastifyInstance & { pg: Client }).pg

  try {
    const userResult = await client.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebase_uid]
    )

    if (userResult.rows.length === 0) {
      return reply.status(404).send({ error: 'User not found for this Firebase ID' })
    }

    const owner_id = userResult.rows[0].id

    // 2. Create task
    const result = await client.query(
      `INSERT INTO tasks (title, description, owner_id, created_at)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [title, description, owner_id]
    )

    reply.code(201).send({
      message: 'Task created successfully',
      task: result.rows[0],
    })
  } catch (error) {
    console.error(error)
    reply.status(500).send({ error: 'Error creating task', detail: error })
  }
}

export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  const { filter = 'all', user_id } = req.query as {
    filter?: 'all' | 'my' | 'shared';
    user_id?: string;
  };

  const client = (req.server as FastifyInstance & { pg: Client }).pg;

  try {
    let query = `
      SELECT 
        t.id,
        t.title,
        t.description,
        t.owner_id,
        t.created_at,
        COALESCE(
          json_agg(
            json_build_object('id', u.id, 'full_name', u.full_name, 'email', u.email)
          ) FILTER (WHERE u.id IS NOT NULL),
          '[]'
        ) AS shared_users
      FROM tasks t
      LEFT JOIN shared_tasks st ON t.id = st.task_id
      LEFT JOIN users u ON st.user_id = u.id
    `;
    const params: any[] = [];

    if (filter === 'my' && user_id) {
      query += ' WHERE t.owner_id = (SELECT id FROM users WHERE firebase_uid = $1)';
      params.push(user_id);
    } else if (filter === 'shared' && user_id) {
      query += ' WHERE t.id IN (SELECT task_id FROM shared_tasks WHERE user_id = (SELECT id FROM users WHERE firebase_uid = $1))';
      params.push(user_id);
    }

    query += ' GROUP BY t.id ORDER BY t.created_at DESC';

    const result = await client.query(query, params);
    reply.send(result.rows);
  } catch (err) {
    reply.status(500).send({ error: 'Error fetching tasks', detail: err });
  }
};



export const deleteTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string }
  const client = (req.server as FastifyInstance & { pg: Client }).pg

  try {
    await client.query('BEGIN')

    await client.query('DELETE FROM shared_tasks WHERE task_id = $1', [id])
    await client.query('DELETE FROM tasks WHERE id = $1', [id])

    await client.query('COMMIT')

    reply.send({ message: 'Task deleted successfully' })
  } catch (err) {
    await client.query('ROLLBACK')
    reply.status(500).send({ error: 'Error deleting task', detail: err })
  }
}



export const updateTask = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string }
  const { title, description } = req.body as { title: string; description: string }

  const client = (req.server as FastifyInstance & { pg: Client }).pg

  try {
    await client.query(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3',
      [title, description, id]
    )
    reply.send({ message: 'Task updated successfully' })
  } catch (err) {
    reply.status(500).send({ error: 'Error updating task', detail: err })
  }
}

