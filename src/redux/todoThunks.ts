import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITask } from "../Interfaces";

export const fetchAllTodos = createAsyncThunk(
  "todo/fetchAllTodos",
  async () => {
    try {
      const response = await axios.get(`http://localhost:5000/todo`);
      return response.data;
    } catch (error) {
      console.error("Ошибка при попытке получить все таски");
    }
  }
);

export const deleteSelectedTodo = createAsyncThunk(
  "todo/deleteSelectedTodo",
  async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/todo/${id}`);
      return id;
    } catch (error) {
      console.error("Ошибка при удалении таски на сервере");
    }
  }
);

export const updateSelectedTodo = createAsyncThunk(
  "todo/updateSelectedTodo",
  async ({ id, done }: { id: string; done: boolean }) => {
    try {
      await axios.patch(`http://localhost:5000/todo/${id}`, {
        done: !done,
      });
      return id;
    } catch (error) {
      console.error("Ошибка при обновлении таски на сервере");
    }
  }
);

export const addTodoThunk = createAsyncThunk(
  "todo/addTodoThunk",
  async (newTodo: ITask) => {
    try {
      const response = await axios.post(`http://localhost:5000/todo/`, newTodo);
      return response.data;
    } catch (error) {
      console.error("Ошибка при добавлении таски на сервер");
    }
  }
);
