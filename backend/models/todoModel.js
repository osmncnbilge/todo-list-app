import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false, required: true },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
