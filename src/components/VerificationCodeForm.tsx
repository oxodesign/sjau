import React from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/core";
import { FadeIn } from "./FadeIn";

type VerificationCodeFormProps = {
  onSubmit: (verificationCode: string) => void;
  isLoading: boolean;
};

export const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const [verificationCode, setVerificationCode] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode) {
      onSubmit(verificationCode);
    }
  };
  return (
    <FadeIn initial="hidden" exit="hidden">
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
          <Button
            type="submit"
            size="lg"
            variantColor="green"
            loadingText="Logger deg inn…"
            isLoading={isLoading}
          >
            Logg inn
          </Button>
        </Stack>
      </form>
    </FadeIn>
  );
};
