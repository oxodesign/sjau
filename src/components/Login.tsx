import React from "react";
import { useAuth } from "reactfire";
import {
  Heading,
  Stack,
  Box,
  Flex,
  Button,
  ButtonGroup,
  Text
} from "@chakra-ui/core";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import * as firebase from "firebase";
import { FadeIn } from "./FadeIn";
import { Container } from "./Container";
import { Layout } from "./Layout";

const ManGardening = React.lazy(() => import("./illustrations/ManGardening"));

type LoginState = "initial" | "logging in" | "generic error";

const getErrorText = (loginState: LoginState) => {
  switch (loginState) {
    case "generic error":
    default:
      return "Æsj, nå var det noe som ikke fungerte som det skulle. Prøv igjen, og se om det ordner seg!";
  }
};

export const Login: React.FC = () => {
  const [loginState, setLoginState] = React.useState<LoginState>("initial");
  const auth = useAuth();
  auth.languageCode = "nb";
  const handleGoogleLogin = () => {
    setLoginState("logging in");
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(GoogleProvider);
  };

  const handleFacebookLogin = () => {
    setLoginState("logging in");
    const FacebookProvider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithRedirect(FacebookProvider);
  };

  React.useEffect(() => {
    const handleRedirectReturn = async () => {
      try {
        auth.getRedirectResult();
      } catch (e) {
        setLoginState("generic error");
        console.error("error while handling redirect return", e);
      }
    };
    handleRedirectReturn();
  }, [auth]);

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
            maxWidth={["50%", "50%", "100%"]}
          >
            <ManGardening width="100%" />
          </FadeIn>
          <Box flex="1 0 67%" p={[0, 0, 6]} width="100%">
            <Box p={[0, 0, 6]}>
              <Stack spacing={6}>
                <Heading as="h1" mt={6}>
                  På tide å logge inn!
                </Heading>
                {loginState === "generic error" && (
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
                <ButtonGroup spacing={3}>
                  <Button
                    variant="outline"
                    variantColor="blue"
                    leftIcon={FaGoogle}
                    onClick={handleGoogleLogin}
                    mb={3}
                  >
                    Logg inn med Google
                  </Button>
                  <Button
                    variant="outline"
                    variantColor="blue"
                    leftIcon={FaFacebookF}
                    onClick={handleFacebookLogin}
                    mb={3}
                  >
                    Logg inn med Facebook
                  </Button>
                </ButtonGroup>
                <Text fontSize="sm" color="gray">
                  Enn så lenge støtter vi kun innlogging med Google og Facebook.
                  Vi jobber med å legge til støtte for flere måter å logge inn
                  på.
                </Text>
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Login;
