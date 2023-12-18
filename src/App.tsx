import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { addTodo, setDone, deleteTodo } from "./redux/todoSlice";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todo.todoList);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    }
  };

  const addTask = (): void => {
    if (!task) {
      alert("Поле не может быть пустым");
      return;
    }
    const newTask = { id: Math.random(), taskName: task, done: false };
    dispatch(addTodo(newTask));
    setTask("");
  };

  const completeTask = (id: number): void => {
    dispatch(setDone(id));
  };

  const deleteTask = (id: number): void => {
    dispatch(deleteTodo(id));
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
    </div>
  );
};

export default App;
