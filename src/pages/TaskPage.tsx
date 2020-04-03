import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Heading,
  Text,
  Badge,
  ButtonGroup,
  Stack
} from "@chakra-ui/core";
import { MdCheck, MdArrowBack, MdThumbUp } from "react-icons/md";
import { useTask, useTaskRef } from "../hooks/useDugnad";
import { useUser, useUserById } from "../hooks/useUser";
import { Container } from "../components/Container";
import { TaskStatusBadge } from "../components/TaskStatusBadge";
import { BackLink } from "../components/BackLink";

export const TaskPage: React.FC = () => {
  const { dugnadId, taskId } = useParams();
  const task = useTask(dugnadId, taskId);
  const taskRef = useTaskRef(dugnadId, taskId);
  const currentUser = useUser();
  const author = useUserById(task.author);
  const assignedUser = useUserById(task.assignedUser);
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
  return (
    <Container>
      <BackLink to={`/dugnad/${dugnadId}`}>Tilbake til dugnaden</BackLink>
      <Heading as="h1" my={6}>
        {task.title}!
      </Heading>

      <Stack isInline my={6}>
        <TaskStatusBadge status={task.status} />
        <Badge>Opprettet av {isCreatedBySelf ? "deg" : author!.name}</Badge>
        {assignedUser && (
          <Badge>Tildelt {isAssignedToSelf ? "deg" : assignedUser.name}</Badge>
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
            {isAssignedToSelf ? "Si fra deg oppgaven" : "Overta denne oppgaven"}
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
            variant="solid"
            variantColor="red"
            leftIcon={MdArrowBack}
            onClick={handleReset}
            size="sm"
          >
            Start oppgaven på nytt
          </Button>
        )}
      </ButtonGroup>

      <Text mt={6}>{task.description}</Text>
    </Container>
  );
};
