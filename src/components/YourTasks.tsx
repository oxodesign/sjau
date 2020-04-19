import React from "react";
import { useUser } from "../hooks/useUser";
import {
  SimpleGrid,
  Box,
  Stack,
  Heading,
  BoxProps,
  Text,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { StrongText } from "./StrongText";
import { useFirestore, useFirestoreCollection } from "reactfire";
import { useDugnad } from "../hooks/useDugnad";

type DugnadNameProps = BoxProps & { dugnadId: string };
const DugnadName: React.FC<DugnadNameProps> = ({ dugnadId, ...rest }) => {
  const { name } = useDugnad(dugnadId);
  return <Text {...rest}>{name}</Text>;
};

export const YourTasks: React.FC = () => {
  const user = useUser();
  const firestore = useFirestore();
  const tasksCurrentlyWorkingOn = useFirestoreCollection(
    firestore
      .collectionGroup("tasks")
      .where("assignedUsers", "array-contains", user?.uid)
      .where("status", "==", "in progress"),
    { idField: "id" }
  ) as any;
  if (!tasksCurrentlyWorkingOn.docs.length) {
    return null;
  }
  return (
    <Stack spacing={6}>
      <Heading as="h2" fontSize="xl">
        Oppgaver du jobber med
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} gridGap={3}>
        {tasksCurrentlyWorkingOn.docs.map((snapshot: any) => {
          // This code is a huge mess, but it's a huge mess for a reason.
          // Turns out it's hard to look up nested data structures, and this is
          // the only way we can get the dugnad data and the task data together.
          const task = snapshot.data();
          const dugnad = snapshot.ref.parent.parent;
          return (
            <Box key={snapshot.id} shadow="md" rounded={3}>
              <Link to={`/dugnad/${dugnad.id}/${snapshot.id}`}>
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
                  <DugnadName dugnadId={dugnad.id} fontSize="sm" />
                </Box>
              </Link>
            </Box>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
};
