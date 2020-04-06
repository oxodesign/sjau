import React from "react";
import { useFormFields } from "../hooks/useFormFields";
import { useFirestore, useAuth } from "reactfire";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Flex,
  Image
} from "@chakra-ui/core";
import wateringFlowersSrc from "../images/watering-flowers.jpg";
import { FadeIn } from "./FadeIn";

type FillOutUserDetailsProps = {
  name?: string;
};

export const FillOutUserDetails: React.FC<FillOutUserDetailsProps> = ({
  name = ""
}) => {
  const uid = useAuth().currentUser?.uid;
  const [formFields, createChangeHandler] = useFormFields({
    name
  });
  const firestore = useFirestore();
  const userRef = firestore.collection("users").doc(uid);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userRef.set({ ...formFields, uid, filledOut: true }, { merge: true });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex
        flexDirection={["column-reverse", "column-reverse", "row", "row"]}
        justifyContent="center"
        alignItems="center"
      >
        <FadeIn initial="hiddenFromLeft" delay={0.3}>
          <Image
            src={wateringFlowersSrc}
            alt="En kvinne som vanner en ampel"
            width="300px"
          />
        </FadeIn>
        <FadeIn initial="hiddenFromRight" ml={[0, 0, 6]}>
          <Stack spacing={6}>
            <Heading>Velkommen!</Heading>
            <Text>Så utrolig kult at du vil være med på å ta i et tak!</Text>
            <Stack spacing={6}>
              <FormControl>
                <FormLabel id="name">Hva heter du?</FormLabel>
                <Input
                  id="name"
                  value={formFields.name}
                  onChange={createChangeHandler("name")}
                  autoComplete="off"
                />
              </FormControl>
              <Button type="submit" variantColor="green" variant="solid">
                Lagre
              </Button>
            </Stack>
          </Stack>
        </FadeIn>
      </Flex>
    </form>
  );
};
