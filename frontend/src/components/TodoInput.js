import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Grid, IconButton, Input, InputAdornment, Paper } from "@mui/material";

function TodoInput() {
  return (
    <Grid item xs={12}>
      <Paper sx={{ padding: 3 }}>
        <Input
          fullWidth
          placeholder="Enter a new To Do"
          endAdornment={
            <InputAdornment position="end" sx={{ paddingBottom: 1 }}>
              <IconButton>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Paper>
    </Grid>
  );
}

export default TodoInput;
