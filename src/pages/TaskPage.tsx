import React from "react";
import { useParams } from "react-router-dom";
import { useTask, useTaskRef } from "../hooks/useDugnad";
import { useUser, useUserById } from "../hooks/useUser";

export const TaskPage: React.FC = () => {
  const { dugnadId, taskId } = useParams();
  const task = useTask(dugnadId, taskId);
  const taskRef = useTaskRef(dugnadId, taskId);
  const currentUser = useUser();
  const author = useUserById(task.author);
  const assignedUser = useUserById(task.assignedUser);
  const isAssignedToSelf = currentUser?.uid === assignedUser?.uid;
  const handleReassign = () => {
    taskRef.update({
      assignedUser: isAssignedToSelf ? null : currentUser!.uid
    });
  };
  return (
    <>
      <h1>{task.title}!</h1>
      <div>{task.status}</div>
      <p>Opprettet av {author!.name}</p>
      {assignedUser && <p>Tildelt {assignedUser.name}</p>}
      <button type="button" onClick={handleReassign}>
        {isAssignedToSelf ? "Si fra deg oppgaven" : "Ta denne oppgaven"}
      </button>
      <p>{task.description}</p>
    </>
  );
};
