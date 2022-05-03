import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "./features/Tasks";
import {
  AppBar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TaskCard from "./TaskCard";
import logo from "./img/logos/React To Do-logos_transparent.png";
import girlDecor from "./img/girl_sitting.png";

function App() {
  const tasks = useSelector((state) => state.tasks.value);
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");

  return (
    <div className="App">
      <header>
        <AppBar position="static" sx={{ backgroundColor: "#F1F1F1" }}>
          <Box justifyContent={"center"} flexDirection={"row"}>
            <img src={logo} alt="todo logo" style={{ width: "10%" }} />
          </Box>
        </AppBar>
      </header>

      <main>
        <Paper elevation={1} sx={{ margin: 5 }}>
          <div className="todo_new_entry">
            <img
              src={girlDecor}
              alt="girl graphic sitting"
              className="header-graphic"
            />
            <Box sx={{ margin: 3, width: "60%" }}>
              <Typography
                variant="h5"
                mb={3}
                className="roboto-bold"
                color={"primary"}
              >
                React Redux To Do List
              </Typography>
              <TextField
                id="todo_new_entry_field"
                label="New Entry"
                variant="outlined"
                value={description}
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                color="secondary"
                variant="contained"
                sx={{ margin: 3 }}
                onClick={() => {
                  dispatch(
                    addTask({
                      id: tasks.length < 1 ? 1 : tasks[tasks.length - 1].id + 1,
                      completed: false,
                      description,
                    })
                  );
                  setDescription("");
                }}
              >
                Submit
              </Button>
            </Box>
          </div>
        </Paper>

        <Stack
          spacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {tasks.map(
            (task) =>
              !task.completed && (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  description={task.description}
                  completed={task.completed}
                />
              )
          )}
        </Stack>

        <Box mt={3}>
          <Typography variant="caption" color={"white"}>
            Completed Tasks
          </Typography>
        </Box>
        <Stack
          spacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {tasks.map(
            (task) =>
              task.completed && (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  description={task.description}
                  completed={task.completed}
                />
              )
          )}
        </Stack>
      </main>
    </div>
  );
}

export default App;
