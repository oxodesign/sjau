import React from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  Image,
  Collapse,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import { AddTask } from "../components/AddTask";
import { TaskList } from "../components/TaskList";
import { useDugnad, useUserDugnads, useDugnadRef } from "../hooks/useDugnad";
import { BackLink } from "../components/BackLink";
import washingSrc from "../images/washing.jpg";
import { FadeIn } from "../components/FadeIn";
import { DugnadCreatedCallout } from "../components/DugnadCreatedCallout";
import { MdEdit, MdCheck, MdArrowBack } from "react-icons/md";
import { EditableDescription } from "../components/EditableDescription";
import { DugnadTiming } from "../components/DugnadTiming";
import { useUser } from "../hooks/useUser";
import { useParticipation } from "../hooks/useParticipation";

const SanitizedMarkdown = React.lazy(() =>
  import("../components/SanitizedMarkdown")
);

export const DugnadPage = () => {
  const { dugnadId } = useParams();
  const dugnad = useDugnad(dugnadId);
  const dugnadRef = useDugnadRef(dugnadId);
  const user = useUser();
  const { search } = useLocation();
  const dugnadsForUser = useUserDugnads(user?.uid);
  const [isDescriptionVisible, setDescriptionVisible] = React.useState(true);
  const [isEditingDescription, setEditingDescription] = React.useState(false);
  const { isParticipatingInDugnad, toggleParticipation } = useParticipation(
    dugnadId!
  );

  if (!dugnad) {
    return <Text>Fant ikke den sjauen!</Text>;
  }

  const justCreatedDugnad = search === "?created";
  const hasLongDescription = (dugnad!.description?.length ?? 0) > 300;

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
                isFirstTime={dugnadsForUser.ownedDugnads.length === 1}
                dugnadId={dugnadId!}
              />
            )}
            <Heading as="h1">
              <Editable onSubmit={handleNameSubmit} defaultValue={dugnad.name}>
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
                <Box
                  bg="green.100"
                  borderColor="green.500"
                  borderWidth="1px"
                  rounded="md"
                  shadow="md"
                  textAlign="center"
                  p={3}
                >
                  Denne sjauen er du med på!{" "}
                  <span role="img" aria-label="Hurra for deg">
                    🎉
                  </span>
                </Box>
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
        {isParticipatingInDugnad && (
          <ButtonGroup>
            <Button
              size="md"
              variant="outline"
              variantColor="red"
              leftIcon={MdArrowBack}
              onClick={toggleParticipation}
            >
              Forlat sjauen
            </Button>
          </ButtonGroup>
        )}
      </Stack>
    </Container>
  );
};
