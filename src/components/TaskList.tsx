import React from "react";
import { Link } from "react-router-dom";
import { Box, Text, Stack, RadioGroup, Radio } from "@chakra-ui/core";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { useTasksForDugnad } from "../hooks/useDugnad";
import { useUser } from "../hooks/useUser";
import { motion } from "framer-motion";

type TaskListProps = {
  dugnadId: string;
};

type CurrentFilterType = "all" | "available" | "your own";
export const TaskList: React.FC<TaskListProps> = ({ dugnadId }) => {
  const [currentFilter, setCurrentFilter] = React.useState<CurrentFilterType>(
    "all"
  );
  const tasks = useTasksForDugnad(dugnadId);
  const currentUser = useUser();
  const filteredTasks = React.useMemo(
    () =>
      tasks
        .filter(task => {
          switch (currentFilter) {
            case "all":
              return true;
            case "available":
              return task.status === "idle";
            case "your own":
              return task.assignedUser === currentUser?.uid;
            default:
              return true;
          }
        })
        .sort((a, b) => {
          const sortOrder = { idle: 0, "in progress": 1, done: 2 };
          if (sortOrder[a.status] < sortOrder[b.status]) return -1;
          if (sortOrder[a.status] > sortOrder[b.status]) return 1;
          return a.title.localeCompare(b.title);
        }),
    [currentUser, tasks, currentFilter]
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

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    hidden: {
      opacity: 0,
      y: "50%",
      transition: {
        when: "afterChildren"
      }
    }
  };
  return (
    <Stack spacing={6}>
      <RadioGroup
        value={currentFilter}
        px={6}
        isInline
        onChange={e => setCurrentFilter(e.target.value as CurrentFilterType)}
      >
        <Radio value="all">Alle oppgaver</Radio>
        <Radio value="available">Bare ledige oppgaver</Radio>
        <Radio value="your own">Bare dine oppgaver</Radio>
      </RadioGroup>
      {!filteredTasks.length && currentFilter === "available" && (
        <Text>
          Det er ingen oppgaver igjen å plukke! Sjekk om det er noe du kan
          hjelpe andre med kanskje?
        </Text>
      )}
      {!filteredTasks.length && currentFilter === "your own" && (
        <Text>
          Du har ikke tatt noen oppgaver enda. På tide å brette opp erma!{" "}
          <span role="img" aria-label="Stram musklene">
            💪
          </span>
        </Text>
      )}
      <motion.div initial="hidden" animate="visible" variants={variants}>
        {filteredTasks.map(task => (
          <Box
            key={task.id}
            shadow="md"
            rounded={3}
            p={6}
            borderLeftWidth="8px"
            borderColor={
              task.assignedUser === currentUser?.uid ? "#76a73d" : "white"
            }
          >
            <Link to={`/dugnad/${dugnadId}/${task.id}`}>
              <Box>
                <strong>{task.title}</strong>
                <br />
                <TaskStatusBadge status={task.status} />
              </Box>
            </Link>
          </Box>
        ))}
      </motion.div>
    </Stack>
  );
};
