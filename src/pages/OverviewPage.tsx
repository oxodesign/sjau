import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { FillOutUserDetails } from "../components/FillOutUserDetails";
import { useUserDugnads } from "../hooks/useDugnad";
import {
  Heading,
  Button,
  ButtonGroup,
  Stack,
  Text,
  Flex,
  Image
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import broomingSrc from "../images/brooming.jpg";
import { FadeIn } from "../components/FadeIn";
import { DugnadList } from "../components/DugnadList";

export const OverviewPage: React.FC = () => {
  const user = useUser();
  const { ownedDugnads, participatedDugnads } = useUserDugnads(user?.uid);
  const hasMadeOrParticipatedInDugnad =
    ownedDugnads.length > 0 || participatedDugnads.length > 0;
  const linkProps = {
    // TODO: Remove this and use a regular link when chakra supports passing
    // as-props
    to: "/ny"
  };
  return (
    <Container>
      {!user && <FillOutUserDetails />}
      {user && (
        <Stack spacing={6}>
          <Flex
            flexDirection={["column-reverse", "column-reverse", "row", "row"]}
            justifyContent="center"
            alignItems="center"
          >
            <FadeIn initial="hiddenFromLeft">
              <Stack spacing={6}>
                <Heading as="h1" wordBreak="break-all" maxWidth="100%">
                  Velkommen, {user.name.split(" ")[0]}!
                </Heading>
                <Text>Det er flott at du er med å ta i et tak!</Text>
                {hasMadeOrParticipatedInDugnad ? (
                  <Text>
                    Du er jo allerede i god gang med å sjaue, så her er det bare
                    å fortsette!
                  </Text>
                ) : (
                  <Stack spacing={6}>
                    <Text>
                      Du har ikke laget noen sjauer, men kanskje det er på tide
                      at du setter opp en?
                    </Text>
                    <ButtonGroup>
                      <Button
                        variantColor="green"
                        variant="solid"
                        size="lg"
                        as={Link}
                        {...linkProps}
                      >
                        Lag din første sjau!
                      </Button>
                    </ButtonGroup>
                  </Stack>
                )}
              </Stack>
            </FadeIn>
            <FadeIn
              initial="hiddenFromRight"
              exit="hiddenFromRight"
              delay={0.1}
            >
              <Image
                mx="auto"
                my={6}
                src={broomingSrc}
                alt="Mor og barn som koster"
                width={["150px", "150px", "200px"]}
              />
            </FadeIn>
          </Flex>
          {hasMadeOrParticipatedInDugnad && (
            <FadeIn initial="hiddenFromBottom" delay={0.2}>
              <ButtonGroup>
                <Button
                  variantColor="green"
                  variant="solid"
                  size="lg"
                  as={Link}
                  {...linkProps}
                >
                  Lag en sjau
                </Button>
              </ButtonGroup>
              {ownedDugnads.length > 0 && (
                <DugnadList
                  title="Sjauer du har laget"
                  dugnads={ownedDugnads}
                />
              )}
              {participatedDugnads.length > 0 && (
                <DugnadList
                  title="Sjauer du er med på"
                  dugnads={participatedDugnads}
                />
              )}
            </FadeIn>
          )}
        </Stack>
      )}
    </Container>
  );
};
