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
  Flex
} from "@chakra-ui/core";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { useTasksForDugnad } from "../hooks/useDugnad";
import { useUser, useUsersById } from "../hooks/useUser";
import { motion } from "framer-motion";
import WomanWinning from "./illustrations/WomanWinning";
import { StrongText } from "./StrongText";

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
  const uniqueParticipatingUsers = Array.from(
    new Set(tasks.flatMap(task => task.assignedUsers))
  );
  const participatingUsers = useUsersById(uniqueParticipatingUsers);
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
              return task.assignedUsers.includes(currentUser!.uid);
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

  return (
    <Stack spacing={6}>
      {tasks.every(task => task.status === "done") && (
        <Box bg="green.100" shadow="md" rounded="md" my={6} p={6}>
          <Flex
            flexDirection={["column-reverse", "column-reverse", "row"]}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              flexGrow={0}
              flexBasis={["60%", "60%", "20%"]}
              width={["60%", "60%", "100%"]}
              mt={[6, 6, 0]}
            >
              <WomanWinning />
            </Box>
            <Box flexGrow={0} flexBasis={["100%", "100%", "70%"]}>
              <Heading mb={6}>Helt ferdig!</Heading>
              <Text>
                Grattis! Dere har gjennomført en perfekt sjau! Alt som skulle
                gjøres har blitt gjort. Alle som skulle bidra har bidratt. Og
                verden er et fredfullt sted. Sees igjen neste sjau!
              </Text>
            </Box>
          </Flex>
        </Box>
      )}
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
        <SimpleGrid columns={[1, 2, 3]} gridGap={3}>
          {filteredTasks.map(task => (
            <Box
              key={task.id}
              shadow="md"
              rounded={3}
              borderLeftWidth="8px"
              borderColor={
                task.assignedUsers.includes(currentUser!.uid)
                  ? "#76a73d"
                  : "white"
              }
            >
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
                    assignedUsers={participatingUsers.filter(participant =>
                      task.assignedUsers.includes(participant.uid)
                    )}
                  />
                </Box>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      </motion.div>
    </Stack>
  );
};
