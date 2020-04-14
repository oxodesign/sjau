import React from "react";
import { useLocation } from "react-router-dom";
import {
  Heading,
  Text,
  Button,
  Stack,
  Image,
  Box,
  Flex,
  List,
  ListItem,
  ButtonGroup
} from "@chakra-ui/core";
import { Link as InternalLink } from "react-router-dom";
import { AuthCheck } from "reactfire";
import { Splash } from "../components/Splash";
import PotPlants from "../components/illustrations/PotPlants";
import step1Src from "../images/steg-1.png";
import step2Src from "../images/steg-2.png";
import step3Src from "../images/steg-3.png";
import { SiteFooter } from "../components/SiteFooter";
import WomanWinning from "../components/illustrations/WomanWinning";
import { TextLink } from "../components/TextLink";
import { StrongText } from "../components/StrongText";

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
                Et verktøy for å gjennomføre dugnader over tid. <br />
                Når det passer.
              </>
            )}
          </Text>
          <ButtonGroup>
            <Button
              as={props => <InternalLink to="/oversikt" {...props} />}
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
          </ButtonGroup>
        </Stack>
      </Splash>
      <Flex
        minHeight={["100vh", "100vh", "67vh"]}
        bg="blue.100"
        color="gray.900"
        justifyContent="center"
        alignItems="center"
      >
        <Box maxWidth="600px" p={6} textAlign="center">
          <Stack spacing={6}>
            <Heading as="h2" fontSize="5xl">
              Sjau?
            </Heading>
            <Text fontSize="xl">
              Sjau lar deg gjennomføre dugnader over en{" "}
              <StrongText>litt lenger periode</StrongText>, uten å miste
              dugnadsånden. Det gir <StrongText>flere folk</StrongText>{" "}
              muligheten til å <StrongText>bli med</StrongText>, samtidig som
              man kan holde god avstand til basiluskene!
            </Text>
            <Text fontSize="xl">
              Dette er perfekt for borettslag, idrettslag og hyttelag, og
              sikkert andre slags lag.{" "}
              <StrongText>Og helt gratis denne våren!</StrongText>
            </Text>
            <Box width="100%" maxWidth="300px" mx="auto">
              <PotPlants />
            </Box>
          </Stack>
        </Box>
      </Flex>
      <Flex
        bg="gray.100"
        color="gray.900"
        minHeight="50vh"
        justifyContent="center"
        alignItems="center"
        px={[6, 6, 0]}
      >
        <Stack spacing={6} my={12}>
          <Heading as="h2" fontSize="5xl" textAlign="center">
            Kom i gang på
            <br />
            1-2-3!
          </Heading>
          <Box maxWidth="700px">
            <List>
              <ListItem mb={6}>
                <Flex
                  justifyContent="space-between"
                  flexDirection={["column", "column", "row"]}
                  alignItems="center"
                >
                  <Box flex="0 0 25%" maxWidth="50%">
                    <Image
                      src={step1Src}
                      alt="Steg 1: Lag en sjau"
                      width="100%"
                    />
                  </Box>
                  <Flex
                    flex="0 0 70%"
                    flexDirection="column"
                    justifyContent="center"
                    textAlign={["center", "center", "left"]}
                  >
                    <Heading as="h3" fontSize="2xl">
                      Lag en sjau
                    </Heading>
                    <Text fontSize="lg">
                      Finn ut når det skal sjaues, og sett av noen datoer som
                      passer. Og ikke minst - lag en liste over alt som skal
                      gjøres!
                    </Text>
                  </Flex>
                </Flex>
              </ListItem>
              <ListItem mb={6}>
                <Flex
                  justifyContent="space-between"
                  flexDirection={["column", "column", "row-reverse"]}
                  alignItems="center"
                >
                  <Box flex="0 0 25%" maxWidth="50%">
                    <Image
                      src={step2Src}
                      alt="Steg 2: Inviter sjauere"
                      width="100%"
                    />
                  </Box>
                  <Flex
                    flex="0 0 70%"
                    flexDirection="column"
                    justifyContent="center"
                    textAlign={["center", "center", "right"]}
                  >
                    <Heading as="h3" fontSize="2xl">
                      Inviter sjauere
                    </Heading>
                    <Text fontSize="lg">
                      En sjau går raskere når man jobber sammen - selv om man
                      ikke jobber samtidig. Inviter naboer, klubbmedlemmer eller
                      kollegas til å bli med!
                    </Text>
                  </Flex>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection={["column", "column", "row"]}
                >
                  <Box flex="0 0 25%" maxWidth="50%">
                    <Image
                      src={step3Src}
                      alt="Steg 3: Sjau i vei"
                      width="100%"
                    />
                  </Box>
                  <Flex
                    flex="0 0 70%"
                    flexDirection="column"
                    justifyContent="center"
                    textAlign={["center", "center", "left"]}
                  >
                    <Heading as="h3" fontSize="2xl">
                      Sjau i vei
                    </Heading>
                    <Text fontSize="lg">
                      Ingenting blir gjort før man tar på støvla, sa bestefar.
                      Vask deg på henda, kom deg ut og få jobben gjort!
                    </Text>
                  </Flex>
                </Flex>
              </ListItem>
            </List>
          </Box>
          <ButtonGroup textAlign="center">
            <Button
              variant="solid"
              variantColor="blue"
              as={props => <InternalLink to="/ny" {...props} />}
            >
              Lag en sjau!
            </Button>
          </ButtonGroup>
        </Stack>
      </Flex>
      <Flex
        color="gray.900"
        minHeight="50vh"
        justifyContent="center"
        alignItems="center"
        px={[6, 6, 0]}
      >
        <Stack spacing={6} my={12}>
          <Heading as="h2" fontSize="5xl" textAlign="center">
            Fortell meg litt om prosjektet!
          </Heading>
          <Box maxWidth="700px">
            <Flex
              flexDirection={["column-reverse", "column-reverse", "row"]}
              justifyContent="space-between"
            >
              <Box flex="0 0 30%">
                <WomanWinning />
              </Box>
              <Box flex="0 0 60%">
                <Stack spacing={6}>
                  <Text fontSize="lg">
                    Sjau ble laget for å løse et{" "}
                    <StrongText>reelt problem</StrongText> - hvordan kunne
                    gjennomføre dugnad i bygården under en pandemi?
                  </Text>

                  <Text fontSize="lg">
                    Vi satt oss ned for å tenke, kode og tegne litt, og
                    plutselig hadde vi noe skikkelig kult.{" "}
                    <TextLink href="https://www.instagram.com/marthemakes/">
                      Marthe Dahlin
                    </TextLink>{" "}
                    har laget alle illustrasjonene, og{" "}
                    <TextLink href="https://medium.com/@erik.mathisen">
                      Erik Mathisen
                    </TextLink>{" "}
                    var mannen bak navnet.{" "}
                    <TextLink href="https://selbekk.io">
                      Kristofer Giltvedt Selbekk
                    </TextLink>{" "}
                    kom på konsept og kodet det hele.
                  </Text>

                  <Heading fontSize="xl">Fortell oss hva du synes!</Heading>

                  <Text fontSize="lg">
                    Sjau er kult allerede, men vi er på langt nær ferdig. Vi
                    trenger hjelp for å komme på ideer, finne bugs og forbedre
                    designet.
                  </Text>
                  <Text fontSize="lg">
                    Send oss en melding på{" "}
                    <TextLink href="https://twitter.com/selbekk">
                      Twitter
                    </TextLink>
                    , eller en{" "}
                    <TextLink href="mailto:kristofer@selbekk.no">
                      e-post
                    </TextLink>
                    , om du vil.
                  </Text>
                </Stack>
              </Box>
            </Flex>
          </Box>
        </Stack>
      </Flex>
      <SiteFooter />
    </Box>
  );
};

export default LandingPage;
