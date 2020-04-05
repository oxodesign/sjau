import React from "react";
import { Link } from "react-router-dom";
import { Heading, Text, Button, Stack } from "@chakra-ui/core";
import { Splash } from "../components/Splash";

const splashImages = [
  "https://images.unsplash.com/photo-1549448046-b89e7214060d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2391&q=80",
  "https://images.unsplash.com/photo-1523301551780-cd17359a95d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  "https://images.unsplash.com/photo-1528092744838-b91de0a10615?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
];

export const LandingPage = () => {
  const randomSplashImage = React.useMemo(
    () => splashImages.sort(() => Math.random() - 0.5).pop(),
    []
  ) as string;
  return (
    <div>
      <Splash
        backgroundImage={`radial-gradient(circle at center, rgba(0,0,0,0.4), transparent), url(${randomSplashImage})`}
      >
        <Stack spacing={6} padding={10}>
          <Heading as="h1" fontSize="5rem" color="white">
            Sjau
          </Heading>
          <Text fontSize="xl" color="white" textShadow={2}>
            Et verktøy for å avholde dugnader over tid. <br />
            Når det passer.
          </Text>
          <Button
            as={props => <Link to="/login" {...props} />}
            variant="solid"
            variantColor="green"
            size="lg"
          >
            Kom i gang nå!
          </Button>
        </Stack>
      </Splash>
    </div>
  );
};
