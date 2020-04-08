import React from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Badge,
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  Image,
  Collapse,
  Button
} from "@chakra-ui/core";
import isFuture from "date-fns/isFuture";
import isPast from "date-fns/isPast";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import nbLocale from "date-fns/locale/nb";
import { Container } from "../components/Container";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { useDugnad, useUserDugnads } from "../hooks/useDugnad";
import { BackLink } from "../components/BackLink";
import washingSrc from "../images/washing.jpg";
import { FadeIn } from "../components/FadeIn";
import { useAuth } from "reactfire";
import { DugnadCreatedCallout } from "../components/DugnadCreatedCallout";

const SanitizedMarkdown = React.lazy(() =>
  import("../components/SanitizedMarkdown")
);

export const DugnadPage = () => {
  const { dugnadId } = useParams();
  const dugnad = useDugnad(dugnadId);
  const auth = useAuth();
  const { search } = useLocation();
  const justCreatedDugnad = search === "?created";
  const dugnadsForUser = useUserDugnads(auth.currentUser?.uid);
  const [isDescriptionVisible, setDescriptionVisible] = React.useState(false);

  if (!dugnad) {
    return <Text>Fant ikke den sjauen!</Text>;
  }

  const startsAt = new Date(dugnad.startsAt);
  const endsAt = new Date(dugnad.endsAt);

  return (
    <Container>
      <Stack spacing={6}>
        <FadeIn initial="hiddenFromLeft" exit="hiddenFromLeft" key="back-block">
          <BackLink to="/oversikt">Tilbake til oversikten</BackLink>
        </FadeIn>
        <Flex>
          <FadeIn
            initial="hiddenFromBottom"
            exit="hiddenFromBottom"
            delay={0.2}
            flex={["1 0 auto", "1 0 auto", "0 0 67%"]}
            maxWidth="100%"
          >
            {justCreatedDugnad && (
              <DugnadCreatedCallout
                isFirstTime={dugnadsForUser.length === 1}
                dugnadId={dugnadId!}
              />
            )}
            <Heading as="h1">{dugnad.name}</Heading>
            <Box mb={6}>
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
                <Box>
                  <Badge variantColor="green">Aktiv!</Badge> Varer i{" "}
                  {formatDistanceToNow(endsAt, { locale: nbLocale })} til
                </Box>
              )}
            </Box>

            {dugnad.description && (
              <React.Suspense
                fallback={
                  <Text textAlign="center" my={6}>
                    Henter beskrivelse
                  </Text>
                }
              >
                <Collapse
                  isOpen={isDescriptionVisible}
                  startingHeight={100}
                  position="relative"
                >
                  {!isDescriptionVisible && (
                    <Box
                      bgImage="linear-gradient(to top, white, transparent)"
                      position="absolute"
                      top={0}
                      pointerEvents="none"
                      height={100}
                      width="100%"
                    />
                  )}
                  <SanitizedMarkdown>{dugnad.description}</SanitizedMarkdown>
                </Collapse>
                <Button
                  variant="solid"
                  variantColor="gray"
                  onClick={() => setDescriptionVisible(prev => !prev)}
                  my={3}
                >
                  {isDescriptionVisible ? "Skjul" : "Vis mer"}
                </Button>
              </React.Suspense>
            )}
            <Box shadow="md" borderWidth="1px" p={5}>
              <AddTask dugnadId={dugnadId!!} />
            </Box>
          </FadeIn>

          <Box
            flex="0 0 33%"
            alignSelf="flex-start"
            ml={30}
            mt={30}
            display={["none", "none", "block"]}
          >
            <FadeIn
              initial="hiddenFromRight"
              exit="hiddenFromRight"
              delay={0.3}
            >
              <Image src={washingSrc} alt="En mann med vaskebøtte og svamp" />
            </FadeIn>
          </Box>
        </Flex>
        <Box pb={30}>
          <FadeIn
            initial="hiddenFromBottom"
            exit="hiddenFromBottom"
            delay={0.4}
          >
            <TaskList dugnadId={dugnadId!!} />
          </FadeIn>
        </Box>
      </Stack>
    </Container>
  );
};
