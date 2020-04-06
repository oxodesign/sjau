import React from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/core";

type PhoneNumberFormProps = {
  onSubmit: (phoneNumber: string) => void;
  isLoading: boolean;
};
export const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
  onSubmit,
  isLoading
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
      <Stack spacing={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="phoneNumber">
            Hva er telefonnummeret ditt?
          </FormLabel>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            placeholder="F.eks. 926 73 134"
          />
        </FormControl>
        <Button
          type="submit"
          id="login-button"
          size="lg"
          variantColor="green"
          isLoading={isLoading}
          loadingText="Sjekk mobilen"
        >
          Logg inn
        </Button>
      </Stack>
    </form>
  );
};
