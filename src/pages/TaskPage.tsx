import React from "react";
import { useParams } from "react-router-dom";
import { useTask } from "../hooks/useDugnad";

export const TaskPage: React.FC = () => {
  const { dugnadId, taskId } = useParams();
  const task = useTask(dugnadId, taskId);
  return (
    <>
      <h1>Task {task.title}!</h1>
    </>
  );
};
