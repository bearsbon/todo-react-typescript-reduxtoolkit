import React, { FC, ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import {
  fetchAllTodos,
  deleteSelectedTodo,
  updateSelectedTodo,
  addTodoThunk,
} from "./redux/todoThunks";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";
import "./App.css";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todo.todoList);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchAllTodos());
    setIsLoading(false);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const addTask = (): void => {
    if (!task) {
      alert("Поле не может быть пустым");
      return;
    }
    const newTask = { id: todoList.length + 1, taskName: task, done: false };
    dispatch(addTodoThunk(newTask));
    setTask("");
  };

  const completeTask = (id: string, isDone: boolean): void => {
    dispatch(updateSelectedTodo({ id: id, done: isDone }));
  };

  const deleteTask = (id: string): void => {
    dispatch(deleteSelectedTodo(id));
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      {isLoading ? (
        <div>Загружаю таски...</div>
      ) : (
        <div className="todoList">
          {todoList.map((task: ITask, key: number) => {
            return (
              <TodoTask
                key={key}
                task={task}
                completeTask={completeTask}
                deleteTask={deleteTask}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
