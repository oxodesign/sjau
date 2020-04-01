import React from "react";

type TaskListProps = {
  dugnadId: string;
  tasks: any[];
};

type Status = "idle" | "in progress" | "done";

const getNextStatus = (prevStatus: Status): Status => {
  switch (prevStatus) {
    case "idle":
      return "in progress";
    case "in progress":
      return "done";
    case "done":
      return "idle";
  }
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (!tasks.length) {
    return <p>Ingen oppgaver er lagt til enda!</p>;
  }
  const updateStatus = (id: string, status: Status) => {
    // TODO: Update status
  };
  const onDeleteClick = (id: string) => {
    // TODO: Delete
  };
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <button
            type="button"
            onClick={() => updateStatus(task.id, getNextStatus(task.status))}
          >
            <p>
              <strong>{task.title}</strong>
            </p>
            {task.description && <p>{task.description}</p>}
            <span>{task.status}</span>
          </button>
          <button type="button" onClick={() => onDeleteClick(task.id)}>
            <span role="img" aria-label="Slett">
              ❌
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
