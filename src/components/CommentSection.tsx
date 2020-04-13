import React from "react";
import { useParams } from "react-router-dom";
import nbLocale from "date-fns/locale/nb";
import { useTaskComments } from "../hooks/useDugnad";
import { Box, Heading, Stack, Text, Flex } from "@chakra-ui/core";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { CommentForm } from "./CommentForm";
import SanitizedMarkdown from "./SanitizedMarkdown";
import { useAuth } from "reactfire";
import { isOnlyEmojis } from "../utils/emoji";

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
        <Flex flexDirection="column">
          {!comments.length && <Text>Ingen kommentarer enda</Text>}
          {comments.map((comment, index) => {
            const isAuthor = comment.authorId === currentUser?.uid;
            return (
              <React.Fragment key={comment.id}>
                <Box
                  py={3}
                  px={4}
                  rounded="1.5em"
                  borderWidth="1px"
                  borderColor="gray.100"
                  bg={isAuthor ? "blue.600" : "gray.100"}
                  color={isAuthor ? "white" : "black"}
                  width="fit-content"
                  alignSelf={isAuthor ? "flex-end" : "flex-start"}
                  key={comment.id}
                >
                  {isOnlyEmojis(comment.content) ? (
                    <Text fontSize="5xl">{comment.content}</Text>
                  ) : (
                    <SanitizedMarkdown>{comment.content}</SanitizedMarkdown>
                  )}
                </Box>
                <Text
                  mb={3}
                  textAlign={isAuthor ? "right" : "left"}
                  fontSize="sm"
                  color="gray.500"
                >
                  {isAuthor ? "Deg" : comment.author} for{" "}
                  {formatDistanceToNow(new Date(comment.timestamp), {
                    addSuffix: true,
                    locale: nbLocale
                  })}
                </Text>
              </React.Fragment>
            );
          })}
        </Flex>
        <CommentForm />
      </Stack>
    </Box>
  );
};
