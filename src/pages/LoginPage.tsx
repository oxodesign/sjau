import React from "react";
import { useAuth } from "reactfire";
import * as firebase from "firebase";
import { VerificationCodeForm } from "../components/VerificationCodeForm";
import { PhoneNumberForm } from "../components/PhoneNumberForm";
import { Heading, Stack, Box, Flex } from "@chakra-ui/core";
import { FadeIn } from "../components/FadeIn";
import { Container } from "../components/Container";
import { Layout } from "../components/Layout";

const ManGardening = React.lazy(() =>
  import("../components/illustrations/ManGardening")
);

type LoginPageProps = {};

type LoginState =
  | "initial"
  | "verification code requested"
  | "verification code sent"
  | "verifying code"
  | "success"
  | "invalid phone number"
  | "captcha check failed"
  | "too many attempts"
  | "expired code"
  | "invalid code"
  | "generic error";

const getErrorText = (loginState: LoginState) => {
  switch (loginState) {
    case "invalid phone number":
      return "Det ser ut til at du har skrevet inn et ugyldig telefonnummer. Sjekk at alt er riktig, og prøv igjen.";
    case "captcha check failed":
      return "Den automatiske sikkerhetssjekken vår tror visst du er en robot. Last inn siden på nytt og prøv igjen.";
    case "too many attempts":
      return "Æsj, nå har du prøvd for mange ganger på rad. Vent litt, så kan du prøve igjen.";
    case "expired code":
      return "Søren, nå brukte du for lang tid på å skrive inn koden. Be om en ny kode og prøv igjen!";
    case "invalid code":
      return "Hmm… Det ser ut til at du skrev inn feil kode. Prøv en gang til!";
    case "generic error":
    default:
      return "Æsj, nå var det noe som ikke fungerte som det skulle. Prøv igjen, og se om det ordner seg!";
  }
};

export const LoginPage: React.FC<LoginPageProps> = () => {
  const [loginState, setLoginState] = React.useState<LoginState>("initial");
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
      setLoginState("verification code requested");
      confirmationResultRef.current = await auth.signInWithPhoneNumber(
        normalizedPhoneNumber,
        window.recaptchaVerifier
      );
      setLoginState("verification code sent");
    } catch (e) {
      window.recaptchaVerifier?.reset();
      switch (e.code) {
        case "auth/captcha-check-failed": {
          setLoginState("captcha check failed");
          return;
        }
        case "auth/invalid-phone-number": {
          setLoginState("invalid phone number");
          return;
        }
        case "auth/too-many-requests": {
          setLoginState("too many attempts");
          return;
        }
        default: {
          console.warn("Saw unrecognized error: ", e);
          setLoginState("generic error");
        }
      }
    }
  };
  const handleVerificationCodeSubmitted = async (verificationCode: string) => {
    try {
      setLoginState("verifying code");
      await confirmationResultRef.current?.confirm(verificationCode);
      setLoginState("success");
    } catch (e) {
      switch (e.code) {
        case "auth/invalid-verification-code": {
          setLoginState("invalid code");
          return;
        }
        case "auth/too-many-requests": {
          setLoginState("too many attempts");
          return;
        }
        default: {
          console.warn("Saw unrecognized error: ", e);
          setLoginState("generic error");
        }
      }
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

  const hasError = ![
    "initial",
    "success",
    "verification code requested",
    "verification code sent",
    "verifying code"
  ].includes(loginState);
  const showVerificationForm = [
    "success",
    "verification code sent",
    "verifying code",
    "invalid code"
  ].includes(loginState);

  return (
    <Layout title="Logg inn">
      <Container>
        <Flex
          minHeight="80vh"
          alignItems="center"
          justifyContent="center"
          flexDirection={["column", "column", "row"]}
        >
          <FadeIn
            flex="0 0 33%"
            initial="hiddenFromLeft"
            exit="hiddenFromLeft"
            delay={0.3}
          >
            <ManGardening width="300px" />
          </FadeIn>
          <Box flex="0 0 67%" p={6}>
            <Box p={6}>
              <Stack spacing={6}>
                <Heading as="h1" mt={6}>
                  Først må vi logge deg inn
                </Heading>
                {hasError && (
                  <Box
                    bg="red.100"
                    rounded="md"
                    borderWidth="2px"
                    borderColor="red.500"
                    maxWidth="400px"
                    my={6}
                    p={6}
                  >
                    {getErrorText(loginState)}
                  </Box>
                )}
                {showVerificationForm ? (
                  <VerificationCodeForm
                    onSubmit={handleVerificationCodeSubmitted}
                    key="verification-code-form"
                    isLoading={loginState === "verifying code"}
                  />
                ) : (
                  <PhoneNumberForm
                    onSubmit={handlePhoneNumberSubmitted}
                    isLoading={loginState === "verification code requested"}
                    key="phone-number-form"
                  />
                )}
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default LoginPage;
