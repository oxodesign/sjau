import React from "react";
import { useFormFields } from "../hooks/useFormFields";
import { useFirestore, useAuth } from "reactfire";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";

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
      <FormControl>
        <FormLabel id="name">Hva heter du?</FormLabel>
        <Input
          id="name"
          value={formFields.name}
          onChange={createChangeHandler("name")}
        />
      </FormControl>
      <Button type="submit">Lagre</Button>
    </form>
  );
};
