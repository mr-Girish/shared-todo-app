-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2025-07-03T12:38:53.173Z

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT 'uuid_generate_v4()',
  "firebase_uid" varchar UNIQUE NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "full_name" varchar,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "tasks" (
  "id" uuid PRIMARY KEY DEFAULT 'uuid_generate_v4()',
  "title" varchar,
  "description" text,
  "owner_id" uuid,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "shared_task" (
  "id" uuid PRIMARY KEY DEFAULT 'uuid_generate_v4()',
  "task_id" uuid,
  "user_id" uuid,
  "assigned_at" timestamp DEFAULT 'now()'
);

ALTER TABLE "tasks" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "shared_task" ADD FOREIGN KEY ("task_id") REFERENCES "tasks" ("id");

ALTER TABLE "shared_task" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
