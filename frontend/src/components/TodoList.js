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
import axios from "axios";

const url = process.env.REACT_APP_API_URL || "http://localhost:5000";

function TodoList() {
  const editInputRef = useRef();
  const [todos, setTodos] = useState([]);
  const [isEditTodoText, setIsEditTodoText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url);
      setTodos(data);
    };
    fetchData();
  }, []);

  const focusEditInput = () => {
    const interval = setInterval(() => {
      if (editInputRef.current) {
        editInputRef.current.focus();
        clearInterval(interval);
      }
    }, 50);
  };

  const editTodoText = (todo) => {
    setIsEditTodoText(todo.text);
  };
  const changeTodoStatus = (todo) => {
    console.log("todo status changed:", todo, "toggle:", !todo.completed);
  };

  const deleteTodo = (todo) => {
    console.log("todo:", todo);
  };

  return (
    <Paper sx={{ padding: isEditTodoText && 3 }}>
      {isEditTodoText ? (
        <Input
          inputRef={editInputRef}
          fullWidth
          value={isEditTodoText}
          onChange={(e) => setIsEditTodoText(e.target.value)}
          endAdornment={
            <InputAdornment position="end" sx={{ paddingBottom: 1 }}>
              <IconButton onClick={(e) => setIsEditTodoText("")}>
                <SaveIcon />
              </IconButton>
            </InputAdornment>
          }
        />
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
                      editTodoText(todo);
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
                onClick={(event) => {
                  changeTodoStatus(todo);
                }}
                sx={{
                  padding: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <ListItemIcon>
                  <Checkbox edge="start" defaultChecked={todo.completed} />
                </ListItemIcon>
                <ListItemText
                  sx={{ textDecoration: todo.completed && "line-through" }}
                  primary={todo.text}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default TodoList;
