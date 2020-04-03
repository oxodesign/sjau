import React from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";

type PhoneNumberFormProps = {
  onSubmit: (phoneNumber: string) => void;
};
export const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
  onSubmit
}) => {
  const [phoneNumber, setPhoneNumber] = usePersistedState("phone-number", "");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      onSubmit(phoneNumber);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel htmlFor="phoneNumber">
          Hva er telefonnummeret ditt?
        </FormLabel>
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
          placeholder="F.eks. 926 73 134"
        />
      </FormControl>
      <Button type="submit" id="login-button">
        Logg inn
      </Button>
    </form>
  );
};
