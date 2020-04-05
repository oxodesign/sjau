import React from "react";
import { useParams } from "react-router-dom";
import { Badge, Box, Heading, Text, Stack, Flex, Image } from "@chakra-ui/core";
import isFuture from "date-fns/isFuture";
import isPast from "date-fns/isPast";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import nbLocale from "date-fns/locale/nb";
import { Container } from "../components/Container";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { useDugnad } from "../hooks/useDugnad";
import { BackLink } from "../components/BackLink";
import washingSrc from "../images/washing.jpg";

const SanitizedMarkdown = React.lazy(() =>
  import("../components/SanitizedMarkdown")
);

export const DugnadPage = () => {
  const { dugnadId } = useParams();
  const dugnad = useDugnad(dugnadId);

  if (!dugnad) {
    return <Text>Fant ikke den sjauen!</Text>;
  }

  const startsAt = new Date(dugnad.startsAt);
  const endsAt = new Date(dugnad.endsAt);

  return (
    <Container>
      <Stack spacing={6}>
        <BackLink to="/">Tilbake til oversikten</BackLink>
        <Flex>
          <Box>
            <Heading as="h1">{dugnad.name}</Heading>
            {isFuture(startsAt) && (
              <Text>
                Starter{" "}
                {formatDistanceToNow(startsAt, {
                  addSuffix: true,
                  locale: nbLocale
                })}
              </Text>
            )}
            {isPast(endsAt) && (
              <Text>
                Ble avsluttet for{" "}
                {formatDistanceToNow(endsAt, {
                  addSuffix: true,
                  locale: nbLocale
                })}
              </Text>
            )}
            {isPast(startsAt) && isFuture(endsAt) && (
              <Text>
                <Badge variantColor="green">Aktiv!</Badge> Varer i{" "}
                {formatDistanceToNow(endsAt, { locale: nbLocale })} til
              </Text>
            )}

            {dugnad.description && (
              <React.Suspense
                fallback={
                  <Text textAlign="center" my={6}>
                    Henter beskrivelse
                  </Text>
                }
              >
                <SanitizedMarkdown>{dugnad.description}</SanitizedMarkdown>
              </React.Suspense>
            )}
            <Box shadow="md" borderWidth="1px" p={5}>
              <AddTask dugnadId={dugnadId!!} />
            </Box>
          </Box>

          <Box
            flex="1 0 33%"
            alignSelf="flex-start"
            ml={30}
            mt={30}
            display={["none", "none", "block"]}
          >
            <Image src={washingSrc} alt="En mann med vaskebøtte og svamp" />
          </Box>
        </Flex>
        <Box>
          <TaskList dugnadId={dugnadId!!} />
        </Box>
      </Stack>
    </Container>
  );
};
