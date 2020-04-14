import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  ButtonGroup,
  Button,
  DrawerFooter,
  FormControl,
  FormLabel,
  Input,
  Box,
  IconButton,
  Flex
} from "@chakra-ui/core";
import { useAuth, useFirestore } from "reactfire";
import { useFormFields } from "../hooks/useFormFields";
import { useUser } from "../hooks/useUser";
import { useHistory } from "react-router-dom";
import { MdCheck } from "react-icons/md";

type SiteSettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SiteSettings: React.FC<SiteSettingsProps> = ({
  isOpen,
  onClose
}) => {
  const auth = useAuth();
  const { push } = useHistory();
  const user = useUser();
  const userRef = useFirestore()
    .collection("users")
    .doc(auth.currentUser?.uid ?? "");
  const [formFields, createChangeHandler] = useFormFields({
    name: user?.name ?? ""
  });
  const updateUser = () => {
    userRef.update(formFields);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser();
    onClose();
  };
  const handleLogout = async () => {
    await auth.signOut();
    push("/?kthx=bye");
  };
  const handleDeleteUser = async () => {
    if (
      window.confirm(
        'Er du helt sikker på at du vil slette brukeren din?\n\nSjauene du har opprettet blir ikke slettet, men du vil bli fjernet som "eier".'
      )
    ) {
      try {
        await userRef.delete();
        await auth.currentUser?.delete();
      } finally {
        push("/?kthx=bye");
      }
    }
  };
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Innstillinger</DrawerHeader>
        <DrawerBody>
          <Stack spacing={12}>
            <Box as="form" onSubmit={handleSubmit}>
              <Flex justifyContent="space-between" alignItems="flex-end">
                <FormControl>
                  <FormLabel id="name">Hva heter du?</FormLabel>
                  <Input
                    id="name"
                    value={formFields.name}
                    onChange={createChangeHandler("name")}
                    onBlur={updateUser}
                  />
                </FormControl>
                <IconButton
                  icon={MdCheck}
                  aria-label="Lagre"
                  variant="solid"
                  variantColor="green"
                  type="submit"
                />
              </Flex>
            </Box>
            <ButtonGroup>
              <Button
                variant="outline"
                variantColor="red"
                onClick={handleLogout}
              >
                Logg ut
              </Button>
            </ButtonGroup>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <ButtonGroup>
            <Button
              variant="solid"
              variantColor="red"
              onClick={handleDeleteUser}
            >
              Slett bruker!
            </Button>
          </ButtonGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
