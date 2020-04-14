import React from "react";
import { useParams } from "react-router-dom";
import { useFirestore, useAuth, useAnalytics } from "reactfire";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
  BoxProps,
  Button
} from "@chakra-ui/core";
import { TaskComment } from "../hooks/useDugnad";

export const CommentForm: React.FC<BoxProps> = props => {
  const { taskId, dugnadId } = useParams();
  const [comment, setComment] = React.useState("");
  const firestore = useFirestore();
  const auth = useAuth();
  const { logEvent } = useAnalytics();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    firestore.collection(`dugnads/${dugnadId}/tasks/${taskId}/comments`).add({
      author: auth.currentUser?.uid,
      content: comment,
      timestamp: Date.now()
    } as TaskComment);
    setComment("");
    logEvent("write_comment", { taskId, dugnadId });
  };
  return (
    <Box {...props} as="form" onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor="name" fontWeight="600">
          Kommentar
        </FormLabel>
        <Textarea
          value={comment}
          id="comment"
          onChange={(e: any) => setComment(e.target.value)}
          aria-describedby="comment-description"
          placeholder="Noen som kan hjelpe med denne?"
          maxWidth="100%"
        />
        <FormHelperText id="comment-description">
          Husk å være høflig og vennlig i kommentarene!
        </FormHelperText>
      </FormControl>
      <Button variant="solid" variantColor="green" type="submit" my={6}>
        Send
      </Button>
    </Box>
  );
};
