import React, { FormEvent } from "react";
import { useAuth } from "reactfire";
import { useUser } from "../hooks/useUser";
import { FillOutUserDetails } from "../components/FillOutUserDetails";
import { Link } from "react-router-dom";
import { useUserDugnads } from "../hooks/useDugnad";
import {
  Heading,
  Button,
  ButtonGroup,
  Stack,
  Text,
  SimpleGrid,
  Box
} from "@chakra-ui/core";
import { Container } from "../components/Container";

export const OverviewPage: React.FC = () => {
  const auth = useAuth();
  const user = useUser();
  const handleLogoutClick = async (e: FormEvent) => {
    e.preventDefault();
    await auth.signOut();
  };
  const yourDugnads = useUserDugnads(user!.uid);
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
          <Heading as="h1">Velkommen, {user.name.split(" ")[0]}!</Heading>
          <Text>Det er flott at du er med å ta i et tak!</Text>
          {hasAlreadyMadeDugnad ? (
            <Text>
              Du er jo allerede i god gang med å lage dugnader, så her er det
              bare å hoppe inn!
            </Text>
          ) : (
            <>
              <Text>
                Du har ikke laget noen dugnader, men kanskje det er på tide at
                du setter opp en?
              </Text>
              <Button
                variantColor="red"
                variant="solid"
                size="lg"
                as={Link}
                {...linkProps}
              >
                Lag ny dugnad
              </Button>
            </>
          )}

          {hasAlreadyMadeDugnad && (
            <Stack spacing={6}>
              <Heading as="h2" fontSize="xl">
                Dine dugnader
              </Heading>
              <SimpleGrid columns={[1, 1, 2, 3]} gridGap={3}>
                {yourDugnads.map(dugnad => (
                  <Box
                    key={dugnad.id}
                    p={6}
                    shadow="md"
                    rounded="md"
                    borderWidth="1px"
                  >
                    <Link to={`/dugnad/${dugnad.id}`}>{dugnad.name}</Link>
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
                  Lag ny dugnad
                </Button>
              </ButtonGroup>
            </Stack>
          )}
          <ButtonGroup>
            <Button type="submit" onClick={handleLogoutClick}>
              Logg ut
            </Button>
          </ButtonGroup>
        </Stack>
      )}
    </Container>
  );
};
