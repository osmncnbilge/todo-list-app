import React from "react";
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
} from "@mui/material";

function TodoList() {
  return (
    <Paper>
      <List>
        <ListItem
          secondaryAction={
            <>
              <IconButton edge="end" aria-label="comments">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="comments">
                <DeleteIcon />
              </IconButton>
            </>
          }
        >
          <ListItemButton
            disableFocusRipple
            disableRipple
            sx={{
              padding: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <ListItemIcon>
              <Checkbox edge="start" />
            </ListItemIcon>
            <ListItemText
              sx={{ textDecoration: "line-through" }}
              primary="Single-line item"
              secondary="Jan 7, 2014"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
}

export default TodoList;
