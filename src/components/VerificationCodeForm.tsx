import React from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/core";

type VerificationCodeFormProps = {
  onSubmit: (verificationCode: string) => void;
};

export const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
  onSubmit
}) => {
  const [verificationCode, setVerificationCode] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode) {
      onSubmit(verificationCode);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="verificationCode">
            Du burde nå få en verifikasjonskode på SMS. Hva er den?
          </FormLabel>
          <Input
            id="verificationCode"
            type="tel"
            value={verificationCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setVerificationCode(e.target.value)
            }
            autoComplete="off"
          />
        </FormControl>
        <Button type="submit" size="lg" variantColor="green">
          Logg inn
        </Button>
      </Stack>
    </form>
  );
};
