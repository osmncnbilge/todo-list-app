import React, { useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const todoInputRef = useRef();
  useEffect(() => {
    todoInputRef.current.focus();
  }, []);
  return (
    <>
      <Container maxWidth="sm">
        <Grid sx={{ height: "100vh" }} container direction="column">
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
    </>
  );
}

export default App;
