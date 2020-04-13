import React from "react";
import { useParams } from "react-router-dom";
import nbLocale from "date-fns/locale/nb";
import { useTaskComments } from "../hooks/useDugnad";
import { Box, Heading, Stack, Text, Flex } from "@chakra-ui/core";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { CommentForm } from "./CommentForm";
import SanitizedMarkdown from "./SanitizedMarkdown";
import { useAuth } from "reactfire";

type CommentSectionProps = {};
export const CommentSection: React.FC<CommentSectionProps> = () => {
  const { taskId, dugnadId } = useParams();
  const currentUser = useAuth().currentUser;
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
        <Flex flexDirection="column">
          {!comments.length && <Text>Ingen kommentarer enda</Text>}
          {comments.map(comment => {
            const isAuthor = comment.authorId === currentUser?.uid;
            console.log(comment, currentUser);
            return (
              <Box
                p={3}
                mb={3}
                rounded="lg"
                borderWidth="1px"
                borderColor="gray.100"
                bg={isAuthor ? "blue.100" : "gray.100"}
                width="fit-content"
                alignSelf={isAuthor ? "flex-end" : "flex-start"}
                key={comment.id}
              >
                <SanitizedMarkdown>{comment.content}</SanitizedMarkdown>
                <Text mt={3} textAlign="right" fontSize="sm" color="gray.500">
                  {isAuthor ? "Deg" : comment.author} for{" "}
                  {formatDistanceToNow(new Date(comment.timestamp), {
                    addSuffix: true,
                    locale: nbLocale
                  })}
                </Text>
              </Box>
            );
          })}
        </Flex>
      </Stack>
    </Box>
  );
};
