import React from "react";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../hooks/useFormFields";
import { useFirestore } from "reactfire";
import { useUser } from "../hooks/useUser";
import {
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Button
} from "@chakra-ui/core";
import { Container } from "../components/Container";

const A_WEEK = 1000 * 60 * 60 * 24 * 7;

export const NewDugnadPage = () => {
  const [formState, createChangeHandler] = useFormFields({
    name: "",
    description: "",
    startsAt: new Date().toLocaleDateString("fr-CA"),
    endsAt: new Date(Date.now() + A_WEEK).toLocaleDateString("fr-CA")
  });
  const dugnadsRef = useFirestore().collection("dugnads");
  const user = useUser();

  const { push } = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dugnadsRef.add({
        ...formState,
        author: user!.uid
      });
      push(`/dugnad/${result.id}`);
    } catch (e) {
      console.error("Kunne ikke opprette ting", e);
    }
  };
  return (
    <Container>
      <Heading as="h1">Lag din egen dugnad</Heading>
      <Text>
        En distribuert dugnad er sikrere, og mest sannsynlig bedre også.
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel htmlFor="name">Hva vil du kalle dugnaden din?</FormLabel>
            <Input
              value={formState.name}
              id="name"
              onChange={createChangeHandler("name")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">
              Skriv en velkomsthilsen til folk!
            </FormLabel>
            <Textarea
              id="description"
              value={formState.description}
              onChange={createChangeHandler("description")}
              resize="vertical"
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="startsAt">
              Når starter dugnadsperioden?
            </FormLabel>
            <Input
              type="date"
              id="startsAt"
              value={formState.startsAt}
              onChange={createChangeHandler("startsAt")}
              min={new Date().toLocaleDateString("fr-CA")}
              aria-describedby="starter-beskrivelse"
              width="xs"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="endsAt">Når slutter dugnaden?</FormLabel>
            <Input
              id="endsAt"
              type="date"
              value={formState.endsAt}
              onChange={createChangeHandler("endsAt")}
              min={formState.startsAt}
              width="xs"
            />
            <FormHelperText id="starter-beskrivelse">
              Distribuerte dugnader fungerer som regel best når man gir folk en
              litt lengre periode å bidra på. En uke, for eksempel?
            </FormHelperText>
          </FormControl>
        </Stack>
        <Button type="submit">Lag oppgaver folk kan gjøre!</Button>
      </form>
    </Container>
  );
};
