import { createSlice } from "@reduxjs/toolkit";
import { FakeTasks } from "../DummyData";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: { value: FakeTasks },
  reducers: {
    addTask: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload.id);
    },
    updateTask: (state, action) => {
      state.value.map((task) => {
        if (task.id === action.payload.id) {
          task.description = action.payload.description;
        }
      });
    },
    checkTask: (state, action) => {
      state.value.map((task) => {
        if (task.id === action.payload.id) {
          task.completed = action.payload.completed;
        }
      });
    },
  },
});
export const { addTask, deleteTask, updateTask, checkTask } = taskSlice.actions;
export default taskSlice.reducer;
