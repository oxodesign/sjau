import React from "react";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../hooks/useFormFields";
import { useFirestore } from "reactfire";
import { useUser } from "../hooks/useUser";
import {
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Button,
  ButtonGroup
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
      <Stack spacing={6}>
        <Heading as="h1">Lag din helt egne sjau</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Hva vil du kalle sjauen din?</FormLabel>
              <Input
                value={formState.name}
                id="name"
                onChange={createChangeHandler("name")}
                aria-describedby="name-description"
                placeholder="Gateveiens dugnadssjau"
              />
              <FormHelperText id="name-description">
                Navnet på borettslaget ditt, klubben din, barnehagen og så
                videre
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="description">
                Skriv litt om sjauen din!
              </FormLabel>
              <Textarea
                id="description"
                aria-describedby="description-description"
                value={formState.description}
                onChange={createChangeHandler("description")}
                resize="vertical"
                placeholder="Velkommen til sjauen vår!"
              />
              <FormHelperText id="description-description">
                Her kan det være fint å gi en velkomsthilsen, og en beskrivelse
                a hvor folk kan finne utstyr og andre ting de trenger.
              </FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="startsAt">Når starter sjauen?</FormLabel>
              <Input
                type="date"
                id="startsAt"
                value={formState.startsAt}
                onChange={createChangeHandler("startsAt")}
                min={new Date().toLocaleDateString("fr-CA")}
                width="xs"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="endsAt">Når slutter sjauen?</FormLabel>
              <Input
                id="endsAt"
                type="date"
                value={formState.endsAt}
                onChange={createChangeHandler("endsAt")}
                min={formState.startsAt}
                aria-describedby="slutter-beskrivelse"
                width="xs"
              />
              <FormHelperText id="slutter-beskrivelse">
                Sjauer fungerer som regel best når man gir folk en litt lengre
                periode å bidra på. En uke, for eksempel? Eller to?
              </FormHelperText>
            </FormControl>
            <ButtonGroup>
              <Button
                size="lg"
                variant="solid"
                variantColor="green"
                type="submit"
              >
                Lag oppgaver folk kan gjøre!
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};
