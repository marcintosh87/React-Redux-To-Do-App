import {
  Button,
  Checkbox,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask, checkTask } from "./features/Tasks";

export default function TaskCard({ completed, description, id }) {
  const [editTask, setEditTask] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          padding: 3,
          width: "90%",
          marginX: 5,
          backgroundColor: !completed ? "white" : "gray",
        }}
        className={`task_entry ${completed ? "slide-bottom" : "slide-in-top"}`}
      >
        <Checkbox
          label="done"
          checked={completed}
          onChange={(e) => {
            dispatch(checkTask({ id, completed: e.target.checked }));
          }}
          flex={1}
        />

        {editTask ? (
          <Stack flex={1} direction="row">
            <TextField
              id="standard-basic"
              label={`Previous entry: ${description}`}
              variant="standard"
              fullWidth
              flex={1}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ marginX: 3, marginY: 2 }}
              onClick={() => {
                dispatch(updateTask({ id: id, description: newDescription }));
                setEditTask(false);
              }}
            >
              Submit
            </Button>
          </Stack>
        ) : (
          <Typography variant="body1" align="left" flex={1}>
            {description}
          </Typography>
        )}

        <IconButton
          aria-label="edit"
          flex={1}
          onClick={() => (editTask ? setEditTask(false) : setEditTask(true))}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          flex={1}
          onClick={() => {
            dispatch(deleteTask({ id: id }));
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
    </>
  );
}
