import React from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  Collapse,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  useClipboard
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { useDugnad, useUserDugnads, useDugnadRef } from "../hooks/useDugnad";
import { BackLink } from "../components/BackLink";
import { FadeIn } from "../components/FadeIn";
import { DugnadCreatedCallout } from "../components/DugnadCreatedCallout";
import { MdEdit, MdCheck, MdDeleteForever, MdExitToApp } from "react-icons/md";
import { EditableDescription } from "../components/EditableDescription";
import { DugnadTiming } from "../components/DugnadTiming";
import { useUser } from "../hooks/useUser";
import { useParticipation } from "../hooks/useParticipation";
import { Layout } from "../components/Layout";

const SanitizedMarkdown = React.lazy(() =>
  import("../components/SanitizedMarkdown")
);
const ManCleaning = React.lazy(() =>
  import("../components/illustrations/ManCleaning")
);

export const DugnadPage = () => {
  const { dugnadId } = useParams();
  const dugnad = useDugnad(dugnadId);
  const dugnadRef = useDugnadRef(dugnadId);
  const user = useUser();
  const { search, pathname } = useLocation();
  const { replace } = useHistory();
  const dugnadsForUser = useUserDugnads(user?.uid);
  const [isDescriptionVisible, setDescriptionVisible] = React.useState(true);
  const [isEditingDescription, setEditingDescription] = React.useState(false);
  const { isParticipatingInDugnad, toggleParticipation } = useParticipation(
    dugnadId!
  );
  const { onCopy, hasCopied } = useClipboard(`https://sjau.no${pathname}`);

  if (!dugnad) {
    return <Text>Fant ikke den sjauen!</Text>;
  }

  const justCreatedDugnad = search === "?created";
  const hasLongDescription = (dugnad!.description?.length ?? 0) > 300;
  const ownsDugnad = dugnad!.author === user?.uid;

  const handleNameSubmit = (value: string) => {
    if (!value) {
      return;
    }
    dugnadRef.update({ name: value });
  };
  const handleDescriptionSubmit = (description: string) => {
    dugnadRef.update({ description });
    setEditingDescription(false);
  };
  const handleDeleteDugnad = () => {
    if (
      window.confirm(
        "Er du sikker på at du vil slette hele dugnaden?\n\nVi har ikke noen angrefunksjonalitet, så da forsvinner alle oppgaver, kommentarer og annen historikk."
      )
    ) {
      dugnadRef.delete();
      replace("/oversikt");
    }
  };

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
              <Heading as="h1">
                <Editable
                  onSubmit={handleNameSubmit}
                  defaultValue={dugnad.name}
                >
                  <EditableInput />
                  <EditablePreview />
                </Editable>
              </Heading>
              <DugnadTiming
                dugnadId={dugnadId!}
                startsAt={dugnad.startsAt}
                endsAt={dugnad.endsAt}
              />
              <Box my={3}>
                {isParticipatingInDugnad ? (
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
                      Denne sjauen er du med på!{" "}
                      <span role="img" aria-label="Hurra for deg">
                        🎉
                      </span>
                    </Box>
                    <Button
                      variant="solid"
                      variantColor="green"
                      onClick={onCopy}
                      m={[3, 3, 0]}
                    >
                      {hasCopied ? "Kopiert!" : "Del sjauen!"}
                    </Button>
                  </Flex>
                ) : (
                  <Button
                    size="lg"
                    variant="solid"
                    variantColor="green"
                    leftIcon={MdCheck}
                    onClick={toggleParticipation}
                  >
                    Bli med å sjaue
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
                <EditableDescription
                  onSubmit={handleDescriptionSubmit}
                  defaultValue={dugnad.description}
                  isEditing={isEditingDescription}
                  mb={3}
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
                </EditableDescription>
                {!isEditingDescription && (
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
                    <Button
                      leftIcon={MdEdit}
                      variant="outline"
                      variantColor="gray"
                      size="xs"
                      onClick={() => {
                        setDescriptionVisible(true);
                        setEditingDescription(true);
                      }}
                    >
                      Endre beskrivelse
                    </Button>
                  </ButtonGroup>
                )}
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
                onClick={toggleParticipation}
              >
                Forlat sjauen
              </Button>
              {ownsDugnad && (
                <Button
                  size="md"
                  variant="solid"
                  variantColor="red"
                  leftIcon={MdDeleteForever}
                  onClick={handleDeleteDugnad}
                >
                  Slett og avslutt sjauen
                </Button>
              )}
            </ButtonGroup>
          )}
        </Stack>
      </Container>
    </Layout>
  );
};

export default DugnadPage;
