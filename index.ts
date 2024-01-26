import "dotenv/config";
import "./database/connection";
import express from "express";
import cors from "cors";
import { db } from "./database/connection";
import { todosSchema } from "./database/schemas/todos";
import { eq } from "drizzle-orm";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const todos = await db.select().from(todosSchema);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const task = req.body.task;
    await db.insert(todosSchema).values({ task: task }).execute();
    const todos = await db.select().from(todosSchema);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/todos", async (req, res) => {
  try {
    const id = req.body.id;
    await db.delete(todosSchema).where(eq(todosSchema.id, id)).execute();
    const todos = await db.select().from(todosSchema);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5050, () => console.log("Server is running on 5050"));
