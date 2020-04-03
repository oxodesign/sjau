import React from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/core";

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
      <FormControl isRequired>
        <FormLabel htmlFor="verificationCode">
          Skriv inn verifikasjonskoden du får på SMS:
        </FormLabel>
        <Input
          id="verificationCode"
          type="tel"
          value={verificationCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setVerificationCode(e.target.value)
          }
        />
      </FormControl>
      <Button type="submit">Logg inn</Button>
    </form>
  );
};
