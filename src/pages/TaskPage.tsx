import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Button,
  Heading,
  Text,
  Badge,
  ButtonGroup,
  Stack,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  Box,
} from "@chakra-ui/core";
import {
  MdCheck,
  MdArrowBack,
  MdThumbUp,
  MdDelete,
  MdEdit,
} from "react-icons/md";
import { useTask, useTaskRef } from "../hooks/useDugnad";
import { useUser, useUserById, useUsersById } from "../hooks/useUser";
import { Container } from "../components/Container";
import { TaskStatusBadge } from "../components/TaskStatusBadge";
import { BackLink } from "../components/BackLink";
import { FadeIn } from "../components/FadeIn";
import { CommentSection } from "../components/CommentSection";
import { EditableDescription } from "../components/EditableDescription";
import { useParticipation } from "../hooks/useParticipation";
import { Layout } from "../components/Layout";
import { useAnalytics } from "reactfire";

const SanitizedMarkdown = React.lazy(() =>
  import("../components/SanitizedMarkdown")
);
const WomanWinning = React.lazy(() =>
  import("../components/illustrations/WomanWinning")
);

export const TaskPage: React.FC = () => {
  const { logEvent } = useAnalytics();
  const { dugnadId, taskId } = useParams();
  const task = useTask(dugnadId, taskId);
  const taskRef = useTaskRef(dugnadId, taskId);
  const user = useUser();
  const author = useUserById(task.author);
  const assignedUsers = useUsersById(task.assignedUsers);
  const { replace } = useHistory();
  const [isEditingDescription, setEditingDescription] = React.useState(false);
  const { participate } = useParticipation(dugnadId!);

  const isAssignedToSelf = assignedUsers.some(
    (assignedUser) => assignedUser?.uid === user?.uid
  );
  const isCreatedBySelf = user?.uid === author?.uid;

  const handleDone = () => {
    taskRef.update({
      status: "done",
    });
    logEvent("task_status_done");
    taskRef.collection("comments").add({
      author: user?.uid,
      content: `${user?.name} satt denne oppgaven som ferdig`,
      timestamp: Date.now(),
      type: "event",
    });
  };
  const handleReset = () => {
    taskRef.update({
      status: "idle",
      assignedUsers: [],
    });
    logEvent("task_status_reset");
    taskRef.collection("comments").add({
      author: user?.uid,
      content: `${user?.name} satt oppgaven tilbake til start`,
      timestamp: Date.now(),
      type: "event",
    });
  };
  const handleDelete = async () => {
    logEvent("task_delete_click");
    if (
      window.confirm(
        "Er du sikker på at du vil slette denne oppgaven?\n\nVi har ikke noen angrefunksjonalitet enda, så du vil ikke kunne gjenopprette hverken oppgaven eller kommentarene."
      )
    ) {
      taskRef.delete();
      logEvent("task_delete_click_confirm");
      replace(`/sjau/${dugnadId}`);
    }
  };
  const handleEditDescription = (description: string) => {
    setEditingDescription(false);
    taskRef.update({ description });
    logEvent("edit_task_description");
  };
  const handleEditTitle = (title: string) => {
    taskRef.update({ title });
    logEvent("edit_task_title");
  };
  const handleJoinOrLeave = () => {
    const assignedUsers = isAssignedToSelf
      ? task.assignedUsers.filter((assignedUser) => assignedUser !== user!.uid)
      : [...task.assignedUsers, user!.uid];
    logEvent(isAssignedToSelf ? "leave_task" : "join_task");
    taskRef.update({
      assignedUsers,
      status: assignedUsers.length === 0 ? "idle" : "in progress",
    });
    taskRef.collection("comments").add({
      author: user?.uid,
      content: isAssignedToSelf
        ? `${user?.name} ga fra seg oppgaven`
        : `${user?.name} ble med på denne oppgaven`,
      timestamp: Date.now(),
      type: "event",
    });
    participate();
  };
  return (
    <Layout title={task.title} description={task.description}>
      <Container>
        <Flex flexDirection={["column", "column", "row"]}>
          <FadeIn initial="hiddenFromLeft" exit="hiddenFromLeft" flexGrow={1}>
            <Stack spacing={6}>
              <BackLink to={`/sjau/${dugnadId}`}>Tilbake til dugnaden</BackLink>
              <Heading as="h1" wordBreak="break-word">
                <Editable defaultValue={task.title} onSubmit={handleEditTitle}>
                  <EditableInput />
                  <EditablePreview />
                </Editable>
              </Heading>

              <Stack isInline flexWrap="wrap" overflowX="hidden">
                <FadeIn
                  initial="hiddenFromLeft"
                  exit="hiddenFromRight"
                  delay={0.2}
                >
                  <TaskStatusBadge
                    status={task.status}
                    assignedUsers={assignedUsers}
                  />
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
              </Stack>
              <ButtonGroup spacing={[2, 2, 4]} size="sm">
                {(!task.status || task.status === "idle") && !isAssignedToSelf && (
                  <Button
                    type="button"
                    variant="solid"
                    variantColor="green"
                    leftIcon={MdThumbUp}
                    onClick={handleJoinOrLeave}
                    mb={[2, 2, 4]}
                  >
                    {task.assignedUsers.length > 0 ? "Bli med på" : "Ta"} denne
                    oppgaven
                  </Button>
                )}
                {task.status === "in progress" && (
                  <Button
                    type="button"
                    variant="outline"
                    variantColor="gray"
                    leftIcon={isAssignedToSelf ? MdArrowBack : MdCheck}
                    onClick={handleJoinOrLeave}
                    mb={[2, 2, 4]}
                  >
                    {isAssignedToSelf
                      ? "Si fra deg oppgaven"
                      : "Bli med på oppgaven"}
                  </Button>
                )}
                {task.status === "in progress" && (
                  <Button
                    type="button"
                    variant="solid"
                    variantColor="green"
                    leftIcon={MdCheck}
                    onClick={handleDone}
                    mb={[2, 2, 4]}
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
                    mb={[2, 2, 4]}
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
                    mb={[2, 2, 4]}
                  >
                    Slett
                  </Button>
                )}
                {!isEditingDescription && (
                  <Button
                    type="button"
                    leftIcon={MdEdit}
                    variant="outline"
                    variantColor="gray"
                    size="sm"
                    mb={[2, 2, 4]}
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
                <Box mb={12}>
                  <EditableDescription
                    isEditing={isEditingDescription}
                    onSubmit={handleEditDescription}
                    defaultValue={task.description}
                  >
                    <SanitizedMarkdown>{task.description}</SanitizedMarkdown>
                  </EditableDescription>
                </Box>
              </React.Suspense>
            </Stack>
          </FadeIn>
          <FadeIn initial="hiddenFromRight" exit="hiddenFromRight" delay={0.2}>
            <Box width="200px" my={6} mx={["auto", "auto", 6, 6]}>
              <WomanWinning />
            </Box>
          </FadeIn>
        </Flex>
        <CommentSection />
      </Container>
    </Layout>
  );
};

export default TaskPage;
