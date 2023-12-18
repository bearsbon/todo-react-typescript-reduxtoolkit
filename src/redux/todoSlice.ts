import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../Interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface InitialState {
  todoList: Array<ITask>;
}

const initialState: InitialState = {
  todoList: [{ id: 1, taskName: "Пример", done: false }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
    },
    setDone: (state, action) => {
      const item: ITask = state.todoList.find((el) => action.payload == el.id);
      item.done = !item.done;
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter((el) => el.id != action.payload);
    },
  },
});

export const { addTodo, setDone, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
