import React from "react";
import { Text, Stack } from "@chakra-ui/core";
import { useTasksForDugnad } from "../hooks/useDugnad";
import { useUser, useUsersById } from "../hooks/useUser";
import { DugnadProgress } from "./DugnadProgress";
import { TaskList } from "./TaskList";

type TasksSectionProps = {
  dugnadId: string;
};

export const TasksSection: React.FC<TasksSectionProps> = ({ dugnadId }) => {
  const tasks = useTasksForDugnad(dugnadId);
  const currentUser = useUser();
  const uniqueParticipatingUsers = Array.from(
    new Set(tasks.flatMap((task) => task.assignedUsers))
  );
  const participatingUsers = useUsersById(uniqueParticipatingUsers);
  const availableTasks = React.useMemo(
    () => tasks.filter((task) => task.status === "idle"),
    [tasks]
  );
  const tasksAssignedToYou = React.useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.status === "in progress" &&
          task.assignedUsers.includes(currentUser!.uid)
      ),
    [tasks, currentUser]
  );
  const tasksAssignedToOtherPeople = React.useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.status === "in progress" &&
          !task.assignedUsers.includes(currentUser!.uid)
      ),
    [tasks, currentUser]
  );
  const completedTasks = React.useMemo(
    () => tasks.filter((task) => task.status === "done"),
    [tasks]
  );
  if (!tasks.length) {
    return (
      <Text>
        Ingen oppgaver er lagt til enda!{" "}
        <span role="img" aria-label="Dra på skuldrene">
          🤷‍♂️
        </span>
      </Text>
    );
  }

  return (
    <Stack spacing={6}>
      <DugnadProgress tasks={tasks} />

      {availableTasks.length > 0 ? (
        <TaskList
          title="Ledige oppgaver"
          dugnadId={dugnadId}
          participatingUsers={participatingUsers}
          tasks={availableTasks}
        />
      ) : (
        <Text>
          Det er ingen oppgaver igjen å plukke! Sjekk om det er noe du kan
          hjelpe andre med kanskje?
        </Text>
      )}
      {tasksAssignedToYou.length > 0 && (
        <TaskList
          title="Dine oppgaver"
          dugnadId={dugnadId}
          participatingUsers={participatingUsers}
          tasks={tasksAssignedToYou}
        />
      )}
      {tasksAssignedToOtherPeople.length > 0 && (
        <TaskList
          title="Oppgaver andre jobber med"
          dugnadId={dugnadId}
          participatingUsers={participatingUsers}
          tasks={tasksAssignedToOtherPeople}
        />
      )}
      {completedTasks.length > 0 && (
        <TaskList
          title="Ferdigstilte oppgaver"
          dugnadId={dugnadId}
          participatingUsers={participatingUsers}
          tasks={completedTasks}
        />
      )}
    </Stack>
  );
};
