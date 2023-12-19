import React from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  completeTask(id: string, isDone: boolean): void;
  deleteTask(id: string): void;
}

const TodoTask = ({ task, completeTask, deleteTask }: Props) => {
  return (
    <div className="task">
      <div className="content">
        <input
          type="checkbox"
          name="done"
          checked={task.done}
          onChange={() => completeTask(task._id!, task.done)}
        />
        <span className={task.done ? "isDone" : ""}>{task.taskName}</span>
      </div>
      <button
        onClick={() => {
          deleteTask(task._id!);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoTask;
