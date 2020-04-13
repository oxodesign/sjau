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
  Flex
} from "@chakra-ui/core";
import { FadeIn } from "./FadeIn";
import { useUser } from "../hooks/useUser";

const WateringFlowers = React.lazy(() =>
  import("./illustrations/WateringFlowers")
);

type FillOutUserDetailsProps = {
  children: React.ReactNode;
};

export const FillOutUserDetails: React.FC<FillOutUserDetailsProps> = ({
  children
}) => {
  const auth = useAuth();
  const uid = auth.currentUser?.uid;
  const displayName = auth.currentUser?.displayName;
  const [formFields, createChangeHandler] = useFormFields({
    name: displayName || ""
  });
  const firestore = useFirestore();

  const userRef = firestore.collection("users").doc(uid);
  const user = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userRef.set({ ...formFields, uid, filledOut: true }, { merge: true });
  };

  if (user) {
    return <>{children}</>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        flexDirection={["column-reverse", "column-reverse", "row", "row"]}
        justifyContent="center"
        alignItems="center"
      >
        <FadeIn initial="hiddenFromLeft" delay={0.3}>
          <WateringFlowers width="300px" />
        </FadeIn>
        <FadeIn initial="hiddenFromRight" ml={[0, 0, 6]}>
          <Stack spacing={6}>
            <Heading>Velkommen!</Heading>
            <Text>Så utrolig kult at du vil være med på å ta i et tak!</Text>
            <Stack spacing={6}>
              <FormControl>
                <FormLabel id="name" fontWeight="600">
                  Hva heter du?
                </FormLabel>
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
