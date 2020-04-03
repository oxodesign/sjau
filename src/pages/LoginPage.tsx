import React from "react";
import { useAuth } from "reactfire";
import * as firebase from "firebase";
import { VerificationCodeForm } from "../components/VerificationCodeForm";
import { PhoneNumberForm } from "../components/PhoneNumberForm";
import { Heading, Stack, Box } from "@chakra-ui/core";
import { Container } from "../components/Container";

type LoginPageProps = {};

export const LoginPage: React.FC<LoginPageProps> = () => {
  const [
    isWaitingForVerificationCode,
    setWaitingForVerificationCode
  ] = React.useState(false);
  const auth = useAuth();
  auth.languageCode = "nb";
  const confirmationResultRef = React.useRef<
    firebase.auth.ConfirmationResult
  >();
  const handlePhoneNumberSubmitted = async (phoneNumber: string) => {
    // first, add +47 if not specified
    let normalizedPhoneNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+47${phoneNumber}`;
    // next, remove any non-numeric characters
    normalizedPhoneNumber = normalizedPhoneNumber.split(/[ \-()]/).join("");
    try {
      confirmationResultRef.current = await auth.signInWithPhoneNumber(
        normalizedPhoneNumber,
        window.recaptchaVerifier
      );
      setWaitingForVerificationCode(true);
    } catch (e) {
      console.error("error when trying to sign in with phone number", e);
      setWaitingForVerificationCode(false);
      window.recaptchaVerifier?.reset();
    }
  };
  const handleVerificationCodeSubmitted = (verificationCode: string) => {
    try {
      confirmationResultRef.current?.confirm(verificationCode);
    } catch (e) {
      setWaitingForVerificationCode(false);
      console.error(e);
    }
  };

  React.useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "login-button",
      { size: "invisible" }
    );
    return () => {
      delete window.recaptchaVerifier;
    };
  }, []);

  return (
    <Container>
      <Box shadow="md" borderWidth="1px" p={6}>
        <Stack spacing={6}>
          <Heading as="h1" mt={6}>
            Først må vi logge deg inn
          </Heading>
          {isWaitingForVerificationCode ? (
            <VerificationCodeForm onSubmit={handleVerificationCodeSubmitted} />
          ) : (
            <PhoneNumberForm onSubmit={handlePhoneNumberSubmitted} />
          )}
        </Stack>
      </Box>
    </Container>
  );
};
