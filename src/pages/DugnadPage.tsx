import React from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  Collapse,
  Button,
  ButtonGroup,
  useClipboard
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { useDugnad, useUserDugnads } from "../hooks/useDugnad";
import { BackLink } from "../components/BackLink";
import { FadeIn } from "../components/FadeIn";
import { DugnadCreatedCallout } from "../components/DugnadCreatedCallout";
import { MdCheck, MdExitToApp, MdContentCopy } from "react-icons/md";
import { GiSpade } from "react-icons/gi";
import { DugnadTiming } from "../components/DugnadTiming";
import { useUser } from "../hooks/useUser";
import { useParticipation } from "../hooks/useParticipation";
import { Layout } from "../components/Layout";
import { usePersistedState } from "../hooks/usePersistedState";
import { EditDugnad } from "../components/EditDugnad";
import { useAnalytics } from "reactfire";

const SanitizedMarkdown = React.lazy(() =>
  import("../components/SanitizedMarkdown")
);
const ManCleaning = React.lazy(() =>
  import("../components/illustrations/ManCleaning")
);

export const DugnadPage = () => {
  const { logEvent } = useAnalytics();
  const { dugnadId } = useParams();
  const dugnad = useDugnad(dugnadId);
  const user = useUser();
  const { search, pathname } = useLocation();
  const dugnadsForUser = useUserDugnads(user?.uid);
  const [isEditing, setEditing] = React.useState(false);

  const hasLongDescription = (dugnad?.description?.length ?? 0) > 300;
  const [isDescriptionVisible, setDescriptionVisible] = usePersistedState(
    "sjau-description-expanded",
    !hasLongDescription
  );
  const { isParticipatingInDugnad, toggleParticipation } = useParticipation(
    dugnadId!
  );
  const { onCopy, hasCopied } = useClipboard(`https://sjau.no${pathname}`);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [isEditing]);

  if (!dugnad) {
    return <Text>Fant ikke den sjauen!</Text>;
  }

  const justCreatedDugnad = search === "?created";
  const ownsDugnad = dugnad!.author === user?.uid;

  if (isEditing) {
    return (
      <Layout title={`Endre ${dugnad.name}`}>
        <Container>
          <Stack spacing={6}>
            <FadeIn
              initial="hiddenFromLeft"
              exit="hiddenFromLeft"
              key="back-block"
            >
              <BackLink onClick={() => setEditing(false)}>
                Tilbake til sjauen
              </BackLink>
            </FadeIn>
            <EditDugnad
              {...dugnad}
              onSubmit={() => setEditing(false)}
              ownsDugnad={ownsDugnad}
            />
          </Stack>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout
      title={dugnad.name}
      description={`Denne sjauen har ${
        dugnad.participants?.length === 1 ? "deltaker" : "deltakere"
      } og ${
        dugnad.tasks?.length === 1 ? "oppgave" : "oppgaver"
      } så langt. Bli med du også!`}
    >
      <Container>
        <Stack spacing={6}>
          <FadeIn
            initial="hiddenFromLeft"
            exit="hiddenFromLeft"
            key="back-block"
          >
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
                  isFirstTime={dugnadsForUser.ownedDugnads.length === 1}
                  dugnadId={dugnadId!}
                />
              )}
              <Heading as="h1">{dugnad.name}</Heading>
              <DugnadTiming
                onEditClick={() => setEditing(true)}
                startsAt={dugnad.startsAt}
                endsAt={dugnad.endsAt}
                ownsDugnad={ownsDugnad}
              />
              <Box my={3}>
                {isParticipatingInDugnad && !justCreatedDugnad && (
                  <Flex
                    bg="green.100"
                    borderColor="green.500"
                    borderWidth="1px"
                    rounded="md"
                    shadow="md"
                    flexDirection={["column", "column", "row"]}
                    alignItems="center"
                    justifyContent={["center", "center", "space-between"]}
                    py={3}
                    px={6}
                  >
                    <Box>
                      Du er med på denne sjauen!{" "}
                      <span role="img" aria-label="Hurra for deg">
                        🎉
                      </span>
                    </Box>
                    <Button
                      variant="solid"
                      variantColor="green"
                      size="sm"
                      rightIcon={hasCopied ? MdCheck : MdContentCopy}
                      onClick={() => {
                        if (onCopy) {
                          onCopy();
                          logEvent("copy_url_button_click");
                        }
                      }}
                      m={[3, 3, 0]}
                    >
                      {hasCopied ? "Kopiert URL!" : "Inviter flere til å delta"}
                    </Button>
                  </Flex>
                )}
                {!isParticipatingInDugnad && !ownsDugnad && (
                  <Button
                    variant="solid"
                    variantColor="green"
                    leftIcon={GiSpade}
                    onClick={toggleParticipation}
                  >
                    Bli med!
                  </Button>
                )}
              </Box>
              <React.Suspense
                fallback={
                  <Text textAlign="center" my={6}>
                    Henter beskrivelse
                  </Text>
                }
              >
                <Collapse
                  isOpen={isDescriptionVisible}
                  startingHeight={hasLongDescription ? 100 : 25}
                  position="relative"
                  aria-hidden={!isDescriptionVisible}
                >
                  {!isDescriptionVisible && (
                    <Box
                      bgImage="linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))"
                      position="absolute"
                      top={0}
                      pointerEvents="none"
                      height={100}
                      width="100%"
                    />
                  )}
                  <SanitizedMarkdown>{dugnad.description}</SanitizedMarkdown>
                </Collapse>
                <ButtonGroup my={3} spacing={3}>
                  {hasLongDescription && (
                    <Button
                      variant="solid"
                      variantColor="gray"
                      size="xs"
                      onClick={() => setDescriptionVisible(prev => !prev)}
                    >
                      {isDescriptionVisible ? "Skjul detaljer" : "Vis mer"}
                    </Button>
                  )}
                </ButtonGroup>
              </React.Suspense>
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
                <ManCleaning />
              </FadeIn>
            </Box>
          </Flex>
          <Box pb={30}>
            <FadeIn
              initial="hiddenFromBottom"
              exit="hiddenFromBottom"
              delay={0.4}
            >
              <Heading mt={12} mb={3}>
                Oppgaver
              </Heading>
              <TaskList dugnadId={dugnadId!!} />
            </FadeIn>
          </Box>
          {isParticipatingInDugnad && (
            <ButtonGroup>
              <Button
                size="md"
                variant="outline"
                variantColor="red"
                leftIcon={MdExitToApp}
                onClick={() => {
                  toggleParticipation();
                  logEvent("leave_sjau", { dugnadId, userId: user?.uid });
                }}
              >
                Forlat sjauen
              </Button>
            </ButtonGroup>
          )}
        </Stack>
      </Container>
    </Layout>
  );
};

export default DugnadPage;
