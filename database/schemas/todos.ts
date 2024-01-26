import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todosSchema = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  task: text("task"),
});
