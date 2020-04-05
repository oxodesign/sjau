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
  Text,
  DrawerFooter,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/core";
import { useAuth, useFirestore } from "reactfire";
import { useFormFields } from "../hooks/useFormFields";
import { useUser } from "../hooks/useUser";

type SiteSettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SiteSettings: React.FC<SiteSettingsProps> = ({
  isOpen,
  onClose
}) => {
  const auth = useAuth();
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

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Innstillinger</DrawerHeader>
        <DrawerBody>
          <Stack spacing={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel id="name">Hva heter du?</FormLabel>
                <Input
                  id="name"
                  value={formFields.name}
                  onChange={createChangeHandler("name")}
                  onBlur={updateUser}
                />
              </FormControl>
              <Text>Her er det egentlig ikke så mye å gjøre enda</Text>
            </form>
          </Stack>
        </DrawerBody>
        <DrawerFooter borderTop="1px">
          <ButtonGroup>
            <Button onClick={() => auth.signOut()}>Logg ut</Button>
          </ButtonGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
