import React, { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  List,
  ListItem,
  Paper,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Input,
  InputAdornment,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { getTodoList } from "../actions/todoActions";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import alertify from "alertifyjs";

function TodoList(props) {
  const editInputRef = useRef();
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);
  const { todos, loading } = todoList;
  const [editingTodo, setEditingTodo] = useState({
    _id: "",
    name: "",
    completed: false,
  });

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  const focusEditInput = () => {
    const interval = setInterval(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        clearInterval(interval);
      }
    }, 50);
  };

  const updateTextTodo = async () => {
    if (!editingTodo.name) {
      alertify.set("notifier", "position", "top-right");
      alertify.warning("Todo does not empty.");
      return;
    }
    try {
      await axios.put(`/api/todos/${editingTodo._id}`, editingTodo);
      setEditingTodo({ _id: "", name: "", completed: false });
      dispatch(getTodoList());
    } catch (error) {
      console.error(error.message);
    }
  };

  const changeTodoStatus = async (todo) => {
    try {
      await axios.put(`/api/todos/${todo._id}`, {
        ...todo,
        completed: !todo.completed,
      });
      dispatch(getTodoList());
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTodo = async (todo) => {
    try {
      await axios.delete(`/api/todos/${todo._id}`);
      dispatch(getTodoList());
      props.todoInputRef.current.focus();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {todos?.length > 0 && (
        <Paper sx={{ padding: editingTodo._id && 3 }}>
          {editingTodo._id ? (
            <Input
              inputRef={editInputRef}
              fullWidth
              value={editingTodo.name}
              onKeyDown={(e) => e.key === "Enter" && updateTextTodo()}
              onChange={(e) =>
                setEditingTodo({ ...editingTodo, name: e.target.value })
              }
              endAdornment={
                <InputAdornment position="end" sx={{ paddingBottom: 1 }}>
                  <IconButton onClick={updateTextTodo}>
                    <SaveIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : loading ? (
            <CircularProgress />
          ) : (
            <List>
              {todos?.map((todo) => (
                <ListItem
                  key={todo._id}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setEditingTodo(todo);
                          focusEditInput();
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          deleteTodo(todo);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemButton
                    disableRipple
                    onClick={() => {
                      changeTodoStatus(todo);
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox edge="start" defaultChecked={todo.completed} />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textDecoration: todo.completed && "line-through" }}
                      primary={todo.name}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      )}
    </>
  );
}

export default TodoList;
