import React from "react";
import { DugnadType, useDugnadRef } from "../hooks/useDugnad";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  ButtonGroup,
  Button,
  Heading,
  Text,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
} from "@chakra-ui/core";
import Datepicker from "./Datepicker";
import { useFormFields } from "../hooks/useFormFields";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useAnalytics } from "reactfire";
import { useSlugAvailability } from "../hooks/useSlugAvailability";
import { slugify } from "../utils/slugify";

type EditDugnadProps = DugnadType & {
  onSubmit: () => void;
  ownsDugnad: boolean;
};

export const EditDugnad: React.FC<EditDugnadProps> = ({
  id,
  name,
  description,
  startsAt,
  endsAt,
  onSubmit,
  ownsDugnad,
  slug,
}) => {
  const { formFields, createChangeHandler } = useFormFields({
    name,
    description,
    startsAt,
    endsAt,
    slug: slug || slugify(name),
  });
  const { replace } = useHistory();
  const { logEvent } = useAnalytics();
  const dugnadRef = useDugnadRef(id);
  const [hasTouchedSlug, setTouchedSlug] = React.useState(false);

  const isSlugAvailable = useSlugAvailability(formFields.slug, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ghetto validation
    if (new Date(formFields.startsAt) > new Date(formFields.endsAt)) {
      alert("Sjauen må starte før den er over, da!");
      return;
    }
    logEvent("edit_sjau");
    dugnadRef.update({
      ...formFields,
      slug: isSlugAvailable ? formFields.slug : null,
    });
    onSubmit();
  };
  const handleDeleteDugnad = () => {
    if (
      window.confirm(
        "Er du sikker på at du vil slette hele dugnaden?\n\nVi har ikke noen angrefunksjonalitet, så da forsvinner alle oppgaver, kommentarer og annen historikk."
      )
    ) {
      dugnadRef.delete();
      logEvent("delete_sjau");
      replace("/oversikt");
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing={10}>
        <Heading>Endre "{name}"</Heading>
        <FormControl isRequired>
          <FormLabel htmlFor="name" fontWeight="600">
            Navn
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
            Navnet på borettslaget ditt, klubben din, barnehagen og så videre
          </FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="description" fontWeight="600">
            Beskrivelse
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
            Her kan det være fint å gi en velkomsthilsen, og en beskrivelse av
            hvor folk kan finne utstyr og andre ting de trenger.
          </FormHelperText>
        </FormControl>

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

        <FormControl isRequired>
          <FormLabel htmlFor="endsAt" fontWeight="600">
            Når slutter sjauen?
          </FormLabel>
          <Datepicker
            id="endsAt"
            selected={new Date(formFields.endsAt)}
            onChange={createChangeHandler("endsAt")}
            minDate={new Date(formFields.startsAt)}
            aria-describedby="slutter-beskrivelse"
          />
          <FormHelperText id="slutter-beskrivelse">
            Sjauer fungerer som regel best når man gir folk en litt lengre
            periode å bidra på. En uke, for eksempel? Eller to?
          </FormHelperText>
        </FormControl>
        <Box>
          <FormControl>
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
                isInvalid={hasTouchedSlug && !isSlugAvailable}
                value={formFields.slug}
                aria-describedby="slug-description"
                roundedLeft={0}
              />
            </InputGroup>
            {!isSlugAvailable && (
              <FormErrorMessage>
                Den URLen er ikke tilgjengelig. Prøv en annen!
                <br />
                Om du vil så kan du også bare la det stå og gå videre for å
                hoppe over egen URL.
              </FormErrorMessage>
            )}
            <FormHelperText id="slug-description">
              Du kan gi sjauen din en egen adresse, så det er lettere å dele den
              med de du vil dele den med.
            </FormHelperText>
          </FormControl>
        </Box>
        <ButtonGroup>
          <Button
            type="submit"
            variant="outline"
            variantColor="blue"
            leftIcon={MdCheck}
          >
            Lagre
          </Button>
        </ButtonGroup>
        {ownsDugnad && (
          <Stack spacing={6}>
            <Heading>
              Faresonen{" "}
              <span role="img" aria-label="varsellys">
                🚨
              </span>
            </Heading>
            <Text>
              Har ting gått at skogen? Da kan du ta en titt på denne seksjonen.
            </Text>
            <ButtonGroup>
              <Button
                size="md"
                variant="solid"
                variantColor="red"
                leftIcon={MdDeleteForever}
                onClick={handleDeleteDugnad}
              >
                Slett og avslutt sjauen
              </Button>
            </ButtonGroup>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
