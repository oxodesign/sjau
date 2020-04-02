import React from "react";
import { useParams } from "react-router-dom";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { useDugnad } from "../hooks/useDugnad";

export const DugnadPage = () => {
  const { dugnadId } = useParams();
  const dugnad = useDugnad(dugnadId);

  if (!dugnad) {
    return <p>Fant ikke den dugnaden!</p>;
  }

  return (
    <>
      <h1>{dugnad.name}</h1>
      <AddTask dugnadId={dugnadId!!} />
      <TaskList dugnadId={dugnadId!!} />
    </>
  );
};
