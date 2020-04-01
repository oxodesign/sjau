import React from "react";
import { useParams } from "react-router-dom";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";

export const DugnadPage = () => {
  const { id } = useParams();

  const dugnad = { name: "placeholder" };
  const notFound = false;
  const tasks = [] as any[];

  if (!dugnad) {
    return <p>Henter dugnad</p>;
  }

  if (notFound) {
    return <p>Fant ikke den dugnaden gitt!</p>;
  }

  return (
    <>
      <h1>{dugnad.name}</h1>
      <p>Her vil du finne oppgavene du skal gjøre</p>
      <AddTask dugnadId={id!!} />
      <TaskList tasks={tasks} dugnadId={id!!} />
    </>
  );
};
