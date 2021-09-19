import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import { Grid, IconButton, Input, InputAdornment, Paper } from "@mui/material";
import axios from "axios";
import { getTodoList } from "../actions/todoActions";
import { useDispatch } from "react-redux";
import alertify from "alertifyjs";

const url = process.env.REACT_APP_API_URL || "http://localhost:5000/";

function TodoInput(props, ref) {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [newTodo, setNewTodo] = useState({
    name: "",
    completed: false,
  });

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  const addTodo = async () => {
    if (!newTodo.name) {
      alertify.set("notifier", "position", "top-right");
      alertify.warning("Todo does not empty.");
      return;
    }
    try {
      await axios.post(url, newTodo);
      dispatch(getTodoList());
      inputRef.current.focus();
      setNewTodo({ ...newTodo, name: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Grid item xs={12}>
      <Paper sx={{ padding: 3 }}>
        <Input
          inputRef={inputRef}
          fullWidth
          value={newTodo.name}
          onChange={(event) =>
            setNewTodo({ ...newTodo, name: event.target.value })
          }
          placeholder="Enter a new To Do"
          endAdornment={
            <InputAdornment position="end" sx={{ paddingBottom: 1 }}>
              <IconButton onClick={addTodo}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Paper>
    </Grid>
  );
}

export default forwardRef(TodoInput);
