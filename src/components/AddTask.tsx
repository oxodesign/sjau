import React from "react";
import { useFormFields } from "../hooks/useFormFields";
import { useDugnadRef } from "../hooks/useDugnad";
import { useUser } from "../hooks/useUser";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack
} from "@chakra-ui/core";

type AddTaskProps = {
  dugnadId: string;
};

export const AddTask: React.FC<AddTaskProps> = ({ dugnadId }) => {
  const [formState, createChangeHandler, resetFormFields] = useFormFields({
    title: "",
    description: ""
  });

  const dugnadRef = useDugnadRef(dugnadId);
  const user = useUser();
  const titleRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dugnadRef
      .collection("tasks")
      .add({ ...formState, author: user!.uid, status: "idle" });
    resetFormFields();
    titleRef.current?.focus();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <FormControl isRequired>
          <FormLabel htmlFor="title">Hva skal gjøres?</FormLabel>
          <Input
            id="title"
            value={formState.title}
            onChange={createChangeHandler("title")}
            placeholder="Rydde opp i kjelleren"
            ref={titleRef}
            autoComplete="off"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Flere detaljer?</FormLabel>
          <Textarea
            id="description"
            value={formState.description}
            onChange={createChangeHandler("description")}
            placeholder="Alt som ikke er innelåst kan kastes i containeren"
          />
        </FormControl>
        <Button variantColor="green" type="submit">
          Legg til!
        </Button>
      </Stack>
    </form>
  );
};
