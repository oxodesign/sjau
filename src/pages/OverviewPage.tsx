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
  SimpleGrid,
  Box,
  Flex,
  Image
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import broomingSrc from "../images/brooming.jpg";
import { FadeIn } from "../components/FadeIn";

export const OverviewPage: React.FC = () => {
  const user = useUser();
  const yourDugnads = useUserDugnads(user?.uid);
  const hasAlreadyMadeDugnad = yourDugnads.length > 0;
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
                {hasAlreadyMadeDugnad ? (
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

          {hasAlreadyMadeDugnad && (
            <FadeIn initial="hiddenFromBottom" delay={0.2}>
              <Stack spacing={6}>
                <Heading as="h2" fontSize="xl">
                  Dine sjauer
                </Heading>
                <SimpleGrid columns={[1, 1, 2, 3]} gridGap={3}>
                  {yourDugnads.map(dugnad => (
                    <Box
                      key={dugnad.id}
                      p={6}
                      shadow="md"
                      rounded="md"
                      borderWidth="1px"
                      as={props => (
                        <Link to={`/dugnad/${dugnad.id}`} {...props} />
                      )}
                      wordBreak="break-all"
                    >
                      {dugnad.name}
                    </Box>
                  ))}
                </SimpleGrid>
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
              </Stack>
            </FadeIn>
          )}
        </Stack>
      )}
    </Container>
  );
};
