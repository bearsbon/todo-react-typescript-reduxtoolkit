import React, {
  FC,
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTodos,
  deleteSelectedTodo,
  updateSelectedTodo,
  addTodoThunk,
} from "./redux/todo/todoThunks";

import { AppDispatch, RootState } from "./redux/store/store";
import { ITask } from "./Interfaces";

import TodoTask from "./Components/TodoTask";
import "./styles/App.css";

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

  console.log("App rerender");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const addTask = (): void => {
    if (!task) {
      alert("Поле не может быть пустым");
      return;
    }
    const newTask: ITask = {
      id: todoList.length + Math.random(),
      taskName: task,
      done: false,
    };
    dispatch(addTodoThunk(newTask));
    setTask("");
  };

  const completeTask = useCallback(
    (id: string, isDone: boolean): void => {
      dispatch(updateSelectedTodo({ id: id, done: isDone }));
    },
    [updateSelectedTodo]
  );

  const deleteTask = useCallback((id: string): void => {
    dispatch(deleteSelectedTodo(id));
  }, []);

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
            onKeyUp={(e) => {
              e.key === "Enter" ? addTask() : null;
            }}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      {isLoading ? (
        <div>Загружаю таски...</div>
      ) : (
        <div className="todoList">
          {todoList.map((task: ITask) => {
            return (
              <TodoTask
                key={task.id}
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
