import React from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  completeTask(id: number): void;
  deleteTask(id: number): void;
}

const TodoTask = ({ task, completeTask, deleteTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <input
          type="checkbox"
          name="done"
          checked={task.done}
          onClick={() => completeTask(task.id)}
        />
        <span className={task.done ? "isDone" : ""}>{task.taskName}</span>
      </div>
      <button
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoTask;
