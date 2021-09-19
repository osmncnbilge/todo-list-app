import express from "express";
import Todo from "../models/todoModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const deletedTodo = await Todo.findById(req.params.id);
  if (deletedTodo) {
    await deletedTodo.remove();
    return res.send({ msg: "Todo Deleted." });
  } else {
    return res.send({ msg: "Error in Deletion." });
  }
});

export default router;
