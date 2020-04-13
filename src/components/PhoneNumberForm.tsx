import React from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormHelperText,
  ButtonGroup,
  Text
} from "@chakra-ui/core";

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
        <Text>
          For å komme videre så må du logge deg inn med telefonen din. Vi sender
          deg en kode på SMS, så ha mobilen klar!
        </Text>
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
            aria-describedby="phone-number-helper-text"
          />
          <FormHelperText id="phone-number-helper-text">
            Hvis du ikke har en konto fra før av, så lager vi en for deg. <br />
            Vi bruker ikke telefonnummeret ditt til noe annet enn å kjenne deg
            igjen.
          </FormHelperText>
        </FormControl>
        <ButtonGroup>
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
        </ButtonGroup>
      </Stack>
    </form>
  );
};
