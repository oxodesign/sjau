import React from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, Stack } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { useDugnad } from "../hooks/useDugnad";
import { BackLink } from "../components/BackLink";

const SanitizedMarkdown = React.lazy(() =>
  import("../components/SanitizedMarkdown")
);

export const DugnadPage = () => {
  const { dugnadId } = useParams();
  const dugnad = useDugnad(dugnadId);

  if (!dugnad) {
    return <Text>Fant ikke den dugnaden!</Text>;
  }

  return (
    <Container>
      <Stack spacing={6}>
        <BackLink to="/">Tilbake til oversikten</BackLink>
        <Heading as="h1">{dugnad.name}</Heading>}
        {dugnad.description && (
          <React.Suspense fallback="2 sek">
            <SanitizedMarkdown>{dugnad.description}</SanitizedMarkdown>
          </React.Suspense>
        )}
        <Box shadow="md" borderWidth="1px" p={5}>
          <AddTask dugnadId={dugnadId!!} />
        </Box>
        <Box>
          <TaskList dugnadId={dugnadId!!} />
        </Box>
      </Stack>
    </Container>
  );
};
