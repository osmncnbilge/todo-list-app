import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoScreen() {
  const todoInputRef = useRef();
  useEffect(() => {
    todoInputRef.current.focus();
  }, []);

  return (
    <div>
      <Container maxWidth="sm">
        <Grid container direction="column">
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <h1>To Do List</h1>
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <TodoInput ref={todoInputRef} />
            <Grid item xs={12} style={{ margin: "10px 0" }}>
              <TodoList />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
