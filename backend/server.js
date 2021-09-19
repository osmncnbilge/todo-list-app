import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import Todo from "./models/todoModel.js";
import { mongoURI } from "./config/keys.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb Connected..."))
  .catch((e) => console.log(e));

app.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

app.post("/", async (req, res) => {
  const todo = new Todo({
    name: req.body.name,
    completed: req.body.completed,
  });
  const newTodo = await todo.save();
  if (newTodo) {
    return res.status(201).send({ msg: "New Todo Created", data: newTodo });
  }
  return res.status(500).send({ msg: "Error in Creating Todo." });
});

app.put("/:id", async (req, res) => {
  const todoId = req.params.id;
  const todo = await Todo.findById(todoId);
  if (todo) {
    todo.name = req.body.name;
    todo.completed = req.body.completed;
    const updatedTodo = await todo.save();

    if (updatedTodo) {
      return res.status(200).send({ msg: "Todo Updated.", data: updatedTodo });
    }
    return res.status(500).send({ msg: "Error in Updating Todo." });
  }
});

app.delete("/:id", async (req, res) => {
  const deletedTodo = await Todo.findById(req.params.id);
  if (deletedTodo) {
    await deletedTodo.remove();
    return res.send({ msg: "Todo Deleted." });
  } else {
    return res.send({ msg: "Error in Deletion." });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
