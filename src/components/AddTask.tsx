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
  Stack,
} from "@chakra-ui/core";
import { useAnalytics } from "reactfire";
import { useParticipation } from "../hooks/useParticipation";

type AddTaskProps = {
  dugnadId: string;
};

export const AddTask: React.FC<AddTaskProps> = ({ dugnadId }) => {
  const { formFields, createChangeHandler, resetFormFields } = useFormFields({
    title: "",
    description: "",
  });

  const dugnadRef = useDugnadRef(dugnadId);
  const user = useUser();
  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const analytics = useAnalytics();
  const { participate } = useParticipation(dugnadId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dugnadRef
      .collection("tasks")
      .add({ ...formFields, author: user!.uid, status: "idle" });
    analytics.logEvent("add_task", { dugnadId });
    resetFormFields();
    titleRef.current?.focus();

    participate();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <FormControl isRequired>
          <FormLabel htmlFor="title">Hva skal gjøres?</FormLabel>
          <Input
            id="title"
            value={formFields.title}
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
            value={formFields.description}
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
