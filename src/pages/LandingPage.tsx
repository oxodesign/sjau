import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heading, Text, Button, Stack, Box } from "@chakra-ui/core";
import { Splash } from "../components/Splash";
import { AuthCheck } from "reactfire";

const splashImages = [
  "https://images.unsplash.com/photo-1549448046-b89e7214060d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1523301551780-cd17359a95d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1528092744838-b91de0a10615?ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1800&q=80"
];

export const LandingPage = () => {
  const { search } = useLocation();
  const justLoggedOut = search === "?kthx=bye";
  const randomSplashImage =
    React.useMemo(() => splashImages.sort(() => Math.random() - 0.5)[0], []) ||
    "";
  return (
    <Box>
      <Splash
        backgroundImage={`radial-gradient(circle at center, rgba(0,0,0,0.4), transparent), url(${randomSplashImage}), url(${randomSplashImage.replace(
          "1800",
          "20"
        )})`}
      >
        <Stack spacing={6} padding={10}>
          <Heading as="h1" fontSize="5rem" color="white">
            {justLoggedOut ? "Takk for nå!" : "Sjau"}
          </Heading>
          <Text fontSize="xl" color="white" textShadow={2}>
            {justLoggedOut ? (
              "Håper vi ser deg igjen snart!"
            ) : (
              <>
                Et verktøy for å avholde dugnader over tid. <br />
                Når det passer.
              </>
            )}
          </Text>
          <Button
            as={props => <Link to="/oversikt" {...props} />}
            variant="solid"
            variantColor="green"
            size="lg"
          >
            <AuthCheck
              fallback={
                justLoggedOut ? "Logg meg inn igjen!!!" : "Kom i gang nå"
              }
            >
              Gå til din oversikt
            </AuthCheck>
          </Button>
          {justLoggedOut && (
            <Text
              color="white"
              bg="rgba(0,0,0,0.5)"
              shadow="md"
              p={6}
              rounded="md"
              width="fit-content"
              mx="auto"
            >
              Hilsen Sjau-gjengen{" "}
              <span role="img" aria-label="vink">
                👋
              </span>
            </Text>
          )}
        </Stack>
      </Splash>
    </Box>
  );
};

export default LandingPage;
