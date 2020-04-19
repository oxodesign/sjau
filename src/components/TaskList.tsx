import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Stack,
  RadioGroup,
  Radio,
  SimpleGrid,
  Heading,
} from "@chakra-ui/core";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { useTasksForDugnad, TaskType } from "../hooks/useDugnad";
import { useUser, useUsersById, UserType } from "../hooks/useUser";
import { motion } from "framer-motion";
import { StrongText } from "./StrongText";
import { DugnadProgress } from "./DugnadProgress";

const variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    y: "50%",
    transition: {
      when: "afterChildren",
    },
  },
};

type TaskListSectionProps = {
  tasks: TaskType[];
  title: string;
  dugnadId: string;
  participatingUsers: UserType[];
};
const TaskListSection: React.FC<TaskListSectionProps> = ({
  tasks,
  dugnadId,
  title,
  participatingUsers,
}) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <Heading as="h3" fontSize="2xl" mt={12} mb={6}>
        {title}
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} gridGap={3}>
        {tasks.map((task) => (
          <Box key={task.id} shadow="md" rounded={3}>
            <Link to={`/dugnad/${dugnadId}/${task.id}`}>
              <Box p={6}>
                <StrongText
                  display="inline-block"
                  maxHeight="200px"
                  wordBreak="break-word"
                  overflowY="hidden"
                >
                  {task.title}
                </StrongText>
                <br />
                <TaskStatusBadge
                  status={task.status}
                  assignedUsers={participatingUsers.filter((participant) =>
                    task.assignedUsers.includes(participant.uid)
                  )}
                />
              </Box>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </motion.div>
  );
};

type TaskListProps = {
  dugnadId: string;
};

export const TaskList: React.FC<TaskListProps> = ({ dugnadId }) => {
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
        <TaskListSection
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
        <TaskListSection
          title="Dine oppgaver"
          dugnadId={dugnadId}
          participatingUsers={participatingUsers}
          tasks={tasksAssignedToYou}
        />
      )}
      {tasksAssignedToOtherPeople.length > 0 && (
        <TaskListSection
          title="Oppgaver andre jobber med"
          dugnadId={dugnadId}
          participatingUsers={participatingUsers}
          tasks={tasksAssignedToOtherPeople}
        />
      )}
      {completedTasks.length > 0 && (
        <TaskListSection
          title="Ferdigstilte oppgaver"
          dugnadId={dugnadId}
          participatingUsers={participatingUsers}
          tasks={completedTasks}
        />
      )}
    </Stack>
  );
};
