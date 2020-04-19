import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useUserDugnads } from "../hooks/useDugnad";
import {
  Heading,
  Button,
  ButtonGroup,
  Stack,
  Text,
  Flex,
  Box,
} from "@chakra-ui/core";
import { Container } from "../components/Container";
import { FadeIn } from "../components/FadeIn";
import { DugnadList } from "../components/DugnadList";
import { Layout } from "../components/Layout";
import { YourTasks } from "../components/YourTasks";

const WomanBrooming = React.lazy(() =>
  import("../components/illustrations/WomanBrooming")
);

export const OverviewPage: React.FC = () => {
  const user = useUser();
  const { ownedDugnads, participatedDugnads } = useUserDugnads(user?.uid);
  const hasMadeOrParticipatedInDugnad =
    ownedDugnads.length > 0 || participatedDugnads.length > 0;

  return (
    <Layout title="Dine sjauer">
      <Container>
        <Stack spacing={6}>
          <Flex
            flexDirection={["column-reverse", "column-reverse", "row", "row"]}
            justifyContent="center"
            alignItems="center"
          >
            <FadeIn initial="hiddenFromLeft">
              <Stack spacing={6}>
                <Heading as="h1" wordBreak="break-all" maxWidth="100%">
                  Velkommen, {user?.name.split(" ")[0] || "sjef"}!
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
                        as={(props) => <Link to="/ny" {...props} />}
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
              <Box mx="auto" my={6} width={["150px", "150px", "200px"]}>
                <WomanBrooming />
              </Box>
            </FadeIn>
          </Flex>
          {hasMadeOrParticipatedInDugnad && (
            <FadeIn initial="hiddenFromBottom" delay={0.2}>
              <ButtonGroup>
                <Button
                  variantColor="green"
                  variant="solid"
                  size="lg"
                  as={(props) => <Link to="/ny" {...props} />}
                >
                  Lag en ny sjau
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
              <YourTasks />
            </FadeIn>
          )}
        </Stack>
      </Container>
    </Layout>
  );
};

export default OverviewPage;
