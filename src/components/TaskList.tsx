import React from "react";
import { Link } from "react-router-dom";
import { useTasksForDugnad } from "../hooks/useDugnad";

type TaskListProps = {
  dugnadId: string;
};

export const TaskList: React.FC<TaskListProps> = ({ dugnadId }) => {
  const tasks = useTasksForDugnad(dugnadId);
  if (!tasks.length) {
    return <p>Ingen oppgaver er lagt til enda!</p>;
  }
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Link to={`/dugnad/${dugnadId}/${task.id}`}>
            <p>
              <strong>{task.title}</strong>
            </p>
            {task.description && <p>{task.description}</p>}
            <span>{task.status}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
