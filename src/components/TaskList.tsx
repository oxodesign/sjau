import React from "react";
import { TaskType } from "../hooks/useDugnad";
import { UserType } from "../hooks/useUser";
import { motion } from "framer-motion";
import { Heading, SimpleGrid, Box } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { StrongText } from "./StrongText";
import { TaskStatusBadge } from "./TaskStatusBadge";

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

type TaskListProps = {
  tasks: TaskType[];
  title: string;
  dugnadId: string;
  participatingUsers: UserType[];
};
export const TaskList: React.FC<TaskListProps> = ({
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
