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
  Box,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import { FadeIn } from "../components/FadeIn";
import { Layout } from "../components/Layout";
import { slugify } from "../utils/slugify";
import { useSlugAvailability } from "../hooks/useSlugAvailability";

const WomanWinning = React.lazy(() =>
  import("../components/illustrations/WomanWinning")
);
const Datepicker = React.lazy(() => import("../components/Datepicker"));

export const NewDugnadPage = () => {
  const { formFields, createChangeHandler, setFormFields } = useFormFields({
    name: "",
    description: "",
    startsAt: new Date().toLocaleDateString("fr-CA"),
    endsAt: addWeeks(new Date(), 1).toLocaleDateString("fr-CA"),
    slug: "",
  });
  const dugnadsRef = useFirestore().collection("dugnads");
  const user = useUser();
  const analytics = useAnalytics();
  const { push } = useHistory();
  const [hasTouchedSlug, setTouchedSlug] = React.useState(false);
  const isSlugAvailable = useSlugAvailability(formFields.slug);

  React.useEffect(() => {
    // If we haven't changed the slug yet,
    // update the default slug to a slug version of the name
    if (!hasTouchedSlug) {
      setFormFields((prev) => ({ ...prev, slug: slugify(formFields.name) }));
    }
  }, [setFormFields, formFields.slug, formFields.name, hasTouchedSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ghetto validation
    if (new Date(formFields.startsAt) > new Date(formFields.endsAt)) {
      alert("Sjauen må starte før den er over, da!");
      return;
    }
    try {
      const result = await dugnadsRef.add({
        ...formFields,
        author: user!.uid,
        participants: [user!.uid],
        slug: isSlugAvailable ? formFields.slug : null,
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
                      value={formFields.name}
                      id="name"
                      onChange={createChangeHandler("name")}
                      aria-describedby="name-description"
                      placeholder="Gateveiens dugnadssjau"
                      autoComplete="off"
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
                      value={formFields.description}
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

                <Box>
                  <FormControl isRequired>
                    <FormLabel htmlFor="startsAt" fontWeight="600">
                      Når starter sjauen?
                    </FormLabel>
                    <Datepicker
                      id="startsAt"
                      selected={new Date(formFields.startsAt)}
                      onChange={createChangeHandler("startsAt")}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel htmlFor="endsAt" fontWeight="600">
                      Når slutter sjauen?
                    </FormLabel>
                    <Datepicker
                      id="endsAt"
                      selected={new Date(formFields.endsAt)}
                      onChange={createChangeHandler("endsAt")}
                      minDate={new Date(formFields.startsAt)}
                      aria-describedby="endsAt-description"
                    />
                    <FormHelperText id="endsAt-description">
                      Sjauer fungerer som regel best når man gir folk en litt
                      lengre periode å bidra på. En uke, for eksempel? Eller to?
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isInvalid={hasTouchedSlug && !isSlugAvailable}>
                    <FormLabel htmlFor="endsAt" fontWeight="600">
                      Hva vil du URL-adressen skal være?
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon>sjau.no/</InputLeftAddon>
                      <Input
                        id="slug"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          createChangeHandler("slug")(e);
                          setTouchedSlug(true);
                        }}
                        value={formFields.slug}
                        aria-describedby="slug-description"
                        roundedLeft={0}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      Den URLen er ikke tilgjengelig. Prøv en annen!
                      <br />
                      Om du vil så kan du også bare la det stå og gå videre for
                      å hoppe over egen URL.
                    </FormErrorMessage>
                    <FormHelperText id="slug-description">
                      Du kan gi sjauen din en egen adresse, så det er lettere å
                      dele den med de du vil dele den med.
                    </FormHelperText>
                  </FormControl>
                </Box>
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
