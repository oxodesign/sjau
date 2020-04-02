import React from "react";
import { useParams } from "react-router-dom";
import { useTask } from "../hooks/useDugnad";
import { useUserById } from "../hooks/useUser";

export const TaskPage: React.FC = () => {
  const { dugnadId, taskId } = useParams();
  const task = useTask(dugnadId, taskId);
  const author = useUserById(task.author);
  return (
    <>
      <h1>{task.title}!</h1>
      <div>{task.status}</div>
      <p>Opprettet av {author.name}</p>
      <p>{task.description}</p>
    </>
  );
};
