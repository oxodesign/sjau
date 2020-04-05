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
  Flex
} from "@chakra-ui/core";
import { MdCheck, MdArrowBack, MdThumbUp, MdDelete } from "react-icons/md";
import { useTask, useTaskRef } from "../hooks/useDugnad";
import { useUser, useUserById } from "../hooks/useUser";
import { Container } from "../components/Container";
import { TaskStatusBadge } from "../components/TaskStatusBadge";
import { BackLink } from "../components/BackLink";
import leavesSrc from "../images/leaves.jpg";

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
  return (
    <Container justifyContent="flex-start">
      <Flex flexDirection={["column", "column", "row", "row"]}>
        <Stack spacing={6}>
          <BackLink to={`/dugnad/${dugnadId}`}>Tilbake til dugnaden</BackLink>
          <Heading as="h1">{task.title}!</Heading>

          <Stack isInline>
            <TaskStatusBadge status={task.status} />
            <Badge>Opprettet av {isCreatedBySelf ? "deg" : author!.name}</Badge>
            {assignedUser && (
              <Badge>
                Tildelt {isAssignedToSelf ? "deg" : assignedUser.name}
              </Badge>
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
              >
                Slett
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
            <SanitizedMarkdown>{task.description}</SanitizedMarkdown>
          </React.Suspense>
        </Stack>
        <Image
          src={leavesSrc}
          alt="En kvinne som raker løv"
          width="200px"
          my={6}
          mx={["auto", "auto", 6, 6]}
        />
      </Flex>
    </Container>
  );
};
