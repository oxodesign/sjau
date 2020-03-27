import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { deleteTask, updateTask } from "../graphql/mutations";

export type TaskType = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  __typename: "Task";
};

type TaskListProps = {
  dugnadID: string;
  tasks: TaskType[];
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
    API.graphql(graphqlOperation(updateTask, { input: { id, status } }));
  };
  const onDeleteClick = (id: string) => {
    API.graphql(graphqlOperation(deleteTask, { input: { id } }));
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
