import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { updateTask } from "../graphql/mutations";

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
  const updateStatus = async (id: string, status: Status) => {
    await API.graphql(graphqlOperation(updateTask, { input: { id, status } }));
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
          {/* TODO: Delete */}
        </li>
      ))}
    </ul>
  );
};
