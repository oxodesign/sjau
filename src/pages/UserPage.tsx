import React from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import {
  Stack,
  Heading,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/core";
import { useAuth, useAnalytics, useFirestore } from "reactfire";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../hooks/useFormFields";
import { useUser } from "../hooks/useUser";
import { MdCheck } from "react-icons/md";

type UserPageProps = {};
export const UserPage: React.FC<UserPageProps> = () => {
  const auth = useAuth();
  const { push } = useHistory();
  const { logEvent } = useAnalytics();
  const user = useUser();
  const userRef = useFirestore()
    .collection("users")
    .doc(auth.currentUser?.uid ?? "");
  const { formFields, createChangeHandler } = useFormFields({
    name: user?.name ?? "",
  });
  const updateUser = () => {
    userRef.update(formFields);
    logEvent("user_change_name");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser();
  };
  const handleLogout = async () => {
    await auth.signOut();
    logEvent("user_logout");
    push("/?kthx=bye");
  };
  const handleDeleteUser = async () => {
    logEvent("user_delete_click");
    if (
      window.confirm(
        'Er du helt sikker på at du vil slette brukeren din?\n\nSjauene du har opprettet blir ikke slettet, men du vil bli fjernet som "eier".'
      )
    ) {
      try {
        logEvent("user_delete_click_conform");
        await userRef.delete();
        await auth.currentUser?.delete();
      } finally {
        push("/?kthx=bye");
      }
    }
  };
  return (
    <Layout title="Kontoen din">
      <Container>
        <Stack spacing={6}>
          <Heading>Kontoen din</Heading>
          <Text>
            Vi har ikke så veldig mye innstillinger om deg, men litt har vi da.
            Her kan du endre navn, logge ut eller slette brukeren din.
          </Text>
          <Box as="form" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel id="name">Hva heter du?</FormLabel>
              <Input
                id="name"
                value={formFields.name}
                onChange={createChangeHandler("name")}
                onBlur={updateUser}
                width="xs"
                maxWidth="100%"
              />
            </FormControl>
          </Box>
          <ButtonGroup>
            <Button
              leftIcon={MdCheck}
              variant="solid"
              variantColor="green"
              type="submit"
            >
              Lagre
            </Button>
          </ButtonGroup>
          <Heading mt={12}>
            Faresonen{" "}
            <span role="img" aria-label="varsellys">
              🚨
            </span>
          </Heading>
          <Text>Her er de skumle valgene</Text>@
          <ButtonGroup spacing={3}>
            <Button variant="outline" variantColor="red" onClick={handleLogout}>
              Logg ut
            </Button>
            <Button
              variant="solid"
              variantColor="red"
              onClick={handleDeleteUser}
            >
              Slett bruker!
            </Button>
          </ButtonGroup>
        </Stack>
      </Container>
    </Layout>
  );
};

export default UserPage;
