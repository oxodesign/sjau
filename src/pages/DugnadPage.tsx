import React from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { getDugnad } from "../graphql/queries";
import { GetDugnadQuery } from "../API";
import { AddTask } from "../components/AddTask";
import { TaskList, TaskType } from "../components/TaskList";
import {
  onCreateTask,
  onUpdateTask,
  onDeleteTask
} from "../graphql/subscriptions";

export const DugnadPage = () => {
  const { id } = useParams();
  const [dugnad, setDugnad] = React.useState<GetDugnadQuery["getDugnad"]>();
  const [notFound, setNotFound] = React.useState(false);

  const fetchDugnad = React.useCallback(async () => {
    const { data } = await API.graphql(graphqlOperation(getDugnad, { id }));
    setDugnad(data.getDugnad);
    setNotFound(!data.getDugnad);
  }, [id]);

  React.useEffect(() => {
    fetchDugnad();
  }, [fetchDugnad]);

  React.useEffect(() => {
    const createSub = API.graphql(graphqlOperation(onCreateTask)).subscribe({
      next: (nextTask: any) => {
        if (nextTask.value.data.onCreateTask.dugnadID === id) {
          fetchDugnad();
        }
      }
    });
    const changeSub = API.graphql(graphqlOperation(onUpdateTask)).subscribe({
      next: (nextTask: any) => {
        if (nextTask.value.data.onUpdateTask.dugnadID === id) {
          fetchDugnad();
        }
      }
    });
    const deleteSub = API.graphql(graphqlOperation(onDeleteTask)).subscribe({
      next: (nextTask: any) => {
        if (nextTask.value.data.onDeleteTask.dugnadID === id) {
          fetchDugnad();
        }
      }
    });
    return () => {
      createSub.unsubscribe();
      changeSub.unsubscribe();
      deleteSub.unsubscribe();
    };
  }, [fetchDugnad, id]);

  if (!dugnad) {
    return <p>Henter dugnad</p>;
  }

  if (notFound) {
    return <p>Fant ikke den dugnaden gitt!</p>;
  }

  const tasks = (dugnad.tasks?.items?.filter(Boolean) ?? []) as TaskType[];

  return (
    <>
      <h1>{dugnad.name}</h1>
      <p>Her vil du finne oppgavene du skal gjøre</p>
      <AddTask dugnadID={id!!} />
      <TaskList tasks={tasks} dugnadID={id!!} />
    </>
  );
};
