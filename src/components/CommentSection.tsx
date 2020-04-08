import React from "react";
import { useParams } from "react-router-dom";
import nbLocale from "date-fns/locale/nb";
import { useTaskComments } from "../hooks/useDugnad";
import { Box, Heading, Stack, Text } from "@chakra-ui/core";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { CommentForm } from "./CommentForm";

type CommentSectionProps = {};
export const CommentSection: React.FC<CommentSectionProps> = () => {
  const { taskId, dugnadId } = useParams();
  const comments = useTaskComments(dugnadId!, taskId!);
  return (
    <Box>
      <Heading as="h3" fontSize="2xl">
        Kommentarer
      </Heading>
      <Stack spacing={6}>
        <Text maxWidth="600px">
          Kommentarfeltet lar oss prate sammen om oppgaven! Spør om hjelp, skriv
          hva du har gjort, og hva som eventuelt gjenstår.
        </Text>
        <CommentForm />
        {!comments.length && <Text>Ingen kommentarer enda</Text>}
        {comments.map(comment => (
          <Box
            p={6}
            rounded="md"
            shadow="md"
            borderWidth="1px"
            borderColor="grey.100"
            bg="grey.900"
            key={comment.id}
          >
            <Text>{comment.content}</Text>
            <Text mt={3} textAlign="right" fontWeight={600}>
              {comment.author} for{" "}
              {formatDistanceToNow(new Date(comment.timestamp), {
                addSuffix: true,
                locale: nbLocale
              })}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
