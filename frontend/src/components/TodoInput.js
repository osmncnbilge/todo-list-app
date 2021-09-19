import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import { Grid, IconButton, Input, InputAdornment, Paper } from "@mui/material";
import { v4 as uuid_v4 } from "uuid";

function TodoInput(props, ref) {
  const inputRef = useRef();
  const [newTodo, setNewTodo] = useState({
    _id: "",
    text: "",
    completed: false,
  });

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  const addNewTod = () => {
    setNewTodo({ ...newTodo, _id: uuid_v4() });
    console.log({ newTodo });
    setNewTodo({ _id: "", text: "", completed: false });
    inputRef.current.focus();
  };

  return (
    <Grid item xs={12}>
      <Paper sx={{ padding: 3 }}>
        <Input
          inputRef={inputRef}
          fullWidth
          value={newTodo.text}
          onChange={(event) =>
            setNewTodo({ ...newTodo, text: event.target.value })
          }
          placeholder="Enter a new To Do"
          endAdornment={
            <InputAdornment position="end" sx={{ paddingBottom: 1 }}>
              <IconButton onClick={addNewTod}>
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
