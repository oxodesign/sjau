import React from "react";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../hooks/useFormFields";
import { useFirestore, useAnalytics } from "reactfire";
import addWeeks from "date-fns/addWeeks";
import { useUser } from "../hooks/useUser";
import {
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Textarea,
  FormHelperText,
  Button,
  ButtonGroup,
  Text,
  Box
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import { FadeIn } from "../components/FadeIn";
import { Layout } from "../components/Layout";

const WomanWinning = React.lazy(() =>
  import("../components/illustrations/WomanWinning")
);

const Datepicker = React.lazy(() => import("../components/Datepicker"));

export const NewDugnadPage = () => {
  const [formState, createChangeHandler] = useFormFields({
    name: "",
    description: "",
    startsAt: new Date().toLocaleDateString("fr-CA"),
    endsAt: addWeeks(new Date(), 1).toLocaleDateString("fr-CA")
  });
  const dugnadsRef = useFirestore().collection("dugnads");
  const user = useUser();
  const analytics = useAnalytics();

  const { push } = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dugnadsRef.add({
        ...formState,
        author: user!.uid,
        participants: [user!.uid]
      });
      analytics.logEvent("create_sjau");
      push(`/sjau/${result.id}?created`);
    } catch (e) {
      console.error("Kunne ikke opprette ting", e);
    }
  };
  return (
    <Layout title="Lag en ny sjau">
      <Container>
        <Stack spacing={6}>
          <Heading as="h1">Lag din helt egne sjau</Heading>
          <Text maxWidth="550px">
            Nå er det på tide vi kommer i gang med litt god gammeldags sjauing!
            Start med å fylle ut litt enkle detaljer om hva den skal hete og når
            dere skal starte.{" "}
            <span role="img" aria-label="Stram musklene">
              💪
            </span>
          </Text>
          <Flex
            flexDirection={["column", "column", "row", "row"]}
            justifyContent="center"
            alignItems="center"
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={10}>
                <FadeIn initial="hiddenFromLeft" exit="hiddenFromRight">
                  <FormControl isRequired>
                    <FormLabel htmlFor="name" fontWeight="600">
                      Hva vil du kalle sjauen din?
                    </FormLabel>
                    <Input
                      value={formState.name}
                      id="name"
                      onChange={createChangeHandler("name")}
                      aria-describedby="name-description"
                      placeholder="Gateveiens dugnadssjau"
                      maxWidth="100%"
                    />
                    <FormHelperText id="name-description">
                      Navnet på borettslaget ditt, klubben din, barnehagen og så
                      videre
                    </FormHelperText>
                  </FormControl>
                </FadeIn>
                <FadeIn
                  initial="hiddenFromLeft"
                  exit="hiddenFromRight"
                  delay={0.1}
                >
                  <FormControl isRequired>
                    <FormLabel htmlFor="description" fontWeight="600">
                      Skriv litt om sjauen din!
                    </FormLabel>
                    <Textarea
                      id="description"
                      aria-describedby="description-description"
                      value={formState.description}
                      onChange={createChangeHandler("description")}
                      resize="vertical"
                      placeholder="Velkommen til sjauen vår!"
                      maxWidth="100%"
                    />
                    <FormHelperText id="description-description">
                      Her kan det være fint å gi en velkomsthilsen, og en
                      beskrivelse av hvor folk kan finne utstyr og andre ting de
                      trenger.
                    </FormHelperText>
                  </FormControl>
                </FadeIn>

                <FadeIn
                  initial="hiddenFromLeft"
                  exit="hiddenFromRight"
                  delay={0.2}
                >
                  <FormControl isRequired>
                    <FormLabel htmlFor="startsAt" fontWeight="600">
                      Når starter sjauen?
                    </FormLabel>
                    <Datepicker
                      id="startsAt"
                      value={formState.startsAt}
                      onChange={createChangeHandler("startsAt")}
                      minDate={addWeeks(new Date(), 1)}
                    />
                  </FormControl>
                </FadeIn>
                <FadeIn
                  initial="hiddenFromLeft"
                  exit="hiddenFromRight"
                  delay={0.3}
                >
                  <FormControl isRequired>
                    <FormLabel htmlFor="endsAt" fontWeight="600">
                      Når slutter sjauen?
                    </FormLabel>
                    <Datepicker
                      id="endsAt"
                      value={formState.endsAt}
                      onChange={createChangeHandler("endsAt")}
                      minDate={new Date(formState.startsAt)}
                      aria-describedby="slutter-beskrivelse"
                    />
                    <FormHelperText id="slutter-beskrivelse">
                      Sjauer fungerer som regel best når man gir folk en litt
                      lengre periode å bidra på. En uke, for eksempel? Eller to?
                    </FormHelperText>
                  </FormControl>
                </FadeIn>
                <FadeIn
                  initial="hiddenFromLeft"
                  exit="hiddenFromRight"
                  delay={0.4}
                >
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
                </FadeIn>
              </Stack>
            </form>
            <FadeIn
              mx={6}
              initial="hiddenFromRight"
              exit="hiddenFromRight"
              delay={0.5}
            >
              <Box width={["60%", "60%", "300px"]} mx="auto" my={6}>
                <WomanWinning />
              </Box>
            </FadeIn>
          </Flex>
        </Stack>
      </Container>
    </Layout>
  );
};

export default NewDugnadPage;
