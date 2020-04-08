import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Button,
  Heading,
  Text,
  Badge,
  ButtonGroup,
  Stack,
  Image,
  Flex,
  Editable,
  EditableInput,
  EditablePreview
} from "@chakra-ui/core";
import {
  MdCheck,
  MdArrowBack,
  MdThumbUp,
  MdDelete,
  MdEdit
} from "react-icons/md";
import { useTask, useTaskRef } from "../hooks/useDugnad";
import { useUser, useUserById } from "../hooks/useUser";
import { Container } from "../components/Container";
import { TaskStatusBadge } from "../components/TaskStatusBadge";
import { BackLink } from "../components/BackLink";
import leavesSrc from "../images/leaves.jpg";
import { FadeIn } from "../components/FadeIn";
import { CommentSection } from "../components/CommentSection";
import { EditableDescription } from "../components/EditableDescription";

const SanitizedMarkdown = React.lazy(() =>
  import("../components/SanitizedMarkdown")
);

export const TaskPage: React.FC = () => {
  const { dugnadId, taskId } = useParams();
  const task = useTask(dugnadId, taskId);
  const taskRef = useTaskRef(dugnadId, taskId);
  const currentUser = useUser();
  const author = useUserById(task.author);
  const assignedUser = useUserById(task.assignedUser);
  const { replace } = useHistory();
  const [isEditingDescription, setEditingDescription] = React.useState(false);
  const isAssignedToSelf = currentUser?.uid === assignedUser?.uid;
  const isCreatedBySelf = currentUser?.uid === author?.uid;

  const handleReassign = () => {
    taskRef.update({
      assignedUser: isAssignedToSelf ? null : currentUser!.uid,
      status: isAssignedToSelf ? "idle" : "in progress"
    });
  };
  const handleDone = () => {
    taskRef.update({
      status: "done"
    });
  };
  const handleReset = () => {
    taskRef.update({
      status: "idle",
      assignedUser: null
    });
  };
  const handleDelete = () => {
    taskRef.delete();
    replace(`/dugnad/${dugnadId}`);
  };
  const handleEditDescription = (description: string) => {
    setEditingDescription(false);
    taskRef.update({ description });
  };
  const handleEditTitle = (title: string) => {
    taskRef.update({ title });
  };
  return (
    <Container justifyContent="flex-start" mb={60}>
      <Flex flexDirection={["column", "column", "row"]}>
        <FadeIn initial="hiddenFromLeft" exit="hiddenFromLeft" flexGrow={1}>
          <Stack spacing={6}>
            <BackLink to={`/dugnad/${dugnadId}`}>Tilbake til dugnaden</BackLink>
            <Heading as="h1">
              <Editable defaultValue={task.title} onSubmit={handleEditTitle}>
                <EditableInput />
                <EditablePreview />
              </Editable>
            </Heading>

            <Stack isInline>
              <FadeIn
                initial="hiddenFromLeft"
                exit="hiddenFromRight"
                delay={0.2}
              >
                <TaskStatusBadge status={task.status} />
              </FadeIn>
              <FadeIn
                initial="hiddenFromLeft"
                exit="hiddenFromRight"
                delay={0.1}
              >
                <Badge>
                  Opprettet av {isCreatedBySelf ? "deg" : author!.name}
                </Badge>
              </FadeIn>
              {assignedUser && (
                <FadeIn initial="hiddenFromLeft" exit="hiddenFromRight">
                  <Badge>
                    Tildelt {isAssignedToSelf ? "deg" : assignedUser.name}
                  </Badge>
                </FadeIn>
              )}
            </Stack>
            <ButtonGroup spacing={4}>
              {(!task.status || task.status === "idle") && (
                <Button
                  type="button"
                  variant="solid"
                  variantColor="green"
                  leftIcon={MdThumbUp}
                  onClick={handleReassign}
                  size="sm"
                  mb={4}
                >
                  Ta denne oppgaven
                </Button>
              )}
              {task.status === "in progress" && (
                <Button
                  type="button"
                  variant="outline"
                  variantColor="gray"
                  leftIcon={MdArrowBack}
                  onClick={handleReassign}
                  size="sm"
                  mb={4}
                >
                  {isAssignedToSelf
                    ? "Si fra deg oppgaven"
                    : "Overta denne oppgaven"}
                </Button>
              )}
              {task.status === "in progress" && (
                <Button
                  type="button"
                  variant="solid"
                  variantColor="green"
                  leftIcon={MdCheck}
                  onClick={handleDone}
                  size="sm"
                  mb={4}
                >
                  Ferdigstill
                </Button>
              )}
              {task.status === "done" && (
                <Button
                  type="button"
                  variant="outline"
                  variantColor="red"
                  leftIcon={MdArrowBack}
                  onClick={handleReset}
                  size="sm"
                  mb={4}
                >
                  Start oppgaven på nytt
                </Button>
              )}
              {isCreatedBySelf && (
                <Button
                  type="button"
                  variant="solid"
                  variantColor="red"
                  leftIcon={MdDelete}
                  onClick={handleDelete}
                  size="sm"
                  mb={4}
                >
                  Slett
                </Button>
              )}
              {!isEditingDescription && (
                <Button
                  type="button"
                  leftIcon={MdEdit}
                  variant="outline"
                  variantColor="grey"
                  size="sm"
                  mb={4}
                  onClick={() => setEditingDescription(true)}
                >
                  Endre beskrivelse
                </Button>
              )}
            </ButtonGroup>

            <React.Suspense
              fallback={
                <Text textAlign="center" my={6}>
                  Henter beskrivelse
                </Text>
              }
            >
              <EditableDescription
                isEditing={isEditingDescription}
                onSubmit={handleEditDescription}
                defaultValue={task.description}
              >
                <SanitizedMarkdown>{task.description}</SanitizedMarkdown>
              </EditableDescription>
            </React.Suspense>
          </Stack>
        </FadeIn>
        <FadeIn initial="hiddenFromRight" exit="hiddenFromRight" delay={0.2}>
          <Image
            src={leavesSrc}
            alt="En kvinne som raker løv"
            width="200px"
            my={6}
            mx={["auto", "auto", 6, 6]}
          />
        </FadeIn>
      </Flex>
      <CommentSection />
    </Container>
  );
};
