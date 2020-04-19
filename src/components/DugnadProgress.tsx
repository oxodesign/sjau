import React from "react";
import { TaskType } from "../hooks/useDugnad";
import { Box, Flex, Heading, Text, Progress } from "@chakra-ui/core";
import WomanWinning from "./illustrations/WomanWinning";

type DugnadProgressProps = {
  tasks: TaskType[];
};
export const DugnadProgress: React.FC<DugnadProgressProps> = ({ tasks }) => {
  if (!tasks.length) {
    return null;
  }
  if (tasks.every((task) => task.status === "idle")) {
    return null;
  }
  if (tasks.every((task) => task.status === "done")) {
    return (
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
    );
  }
  const percentageDone = Math.round(
    (tasks.filter((task) => task.status === "done").length / tasks.length) * 100
  );
  return (
    <Box mb={6}>
      <Progress
        value={percentageDone}
        aria-describedby="percentage-done"
        color="green"
      />
      <Text id="percentage-done">Dere er {percentageDone} % ferdig!</Text>
    </Box>
  );
};
