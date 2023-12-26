import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../Interfaces";
import {
  fetchAllTodos,
  deleteSelectedTodo,
  updateSelectedTodo,
  addTodoThunk,
} from "./todoThunks";

interface InitialState {
  todoList: Array<ITask>;
}

const initialState: InitialState = {
  todoList: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITask>) => {
      state.todoList.push(action.payload);
    },
    setDone: (state, action: PayloadAction<number>) => {
      const item = state.todoList.find((el) => action.payload == el.id);
      item!.done = !item!.done;
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter((el) => el.id != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      state.todoList = action.payload;
    });
    builder.addCase(deleteSelectedTodo.fulfilled, (state, action) => {
      state.todoList = state.todoList.filter((el) => el._id !== action.payload);
    });
    builder.addCase(updateSelectedTodo.fulfilled, (state, action) => {
      const todo = state.todoList.find((el) => el._id === action.payload);
      todo!.done = !todo!.done;
    });
    builder.addCase(addTodoThunk.fulfilled, (state, action) => {
      state.todoList.push(action.payload);
    });
  },
});

export const { addTodo, setDone, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
