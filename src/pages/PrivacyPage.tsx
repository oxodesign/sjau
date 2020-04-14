import React from "react";
import { Heading, Text, Code, Stack } from "@chakra-ui/core";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { TextLink } from "../components/TextLink";

const PrivacyPage: React.FC = () => {
  return (
    <Layout title="Personvern">
      <Container>
        <Stack spacing={6}>
          <Heading as="h1">Personvern</Heading>
          <Text>
            Vi har ikke så veldig lyst på dataen din, så vi passer på å samle
            inn minst mulig. Litt må allikevel til, og her kan du lese om det vi
            trenger.
          </Text>
          <Heading fontSize="xl" mt={12}>
            Informasjonskapsler
          </Heading>
          <Text>
            Vi bruker informasjonskapsler til to ting - å analysere hvordan du
            bruker siden, og å logge deg inn. For bruksmønsteranalyse bruker vi
            Google Analytics, og for å logge deg inn bruker vi Google's
            Firebase. Du vil finne dem som <Code>_ga</Code> cookies.
          </Text>
          <Text>
            Vi bruker ikke disse informasjonskapslene direkte, men de blir både
            skrevet og konsumert av tredjeparter.
          </Text>

          <Heading fontSize="xl" mt={12}>
            Dataen din
          </Heading>
          <Text>
            Som skrevet innledningsvis vil vi ikke ha så mye med dataen din å
            gjøre. Vi får navn og epost av enten Facebook eller Google når du
            logger deg inn, og vi ber deg skrive inn navnet ditt når du først
            oppretter en bruker.
          </Text>
          <Text>
            I tillegg til dette, så samler vi inn all dataen vi trenger for å
            lage sjauer, oppgaver til sjauene og kommentarer til oppgavene
            igjen.
          </Text>
          <Text>
            Du kan få utlevert all dataen vi har på deg om du vil, bare send oss
            en mail på{" "}
            <TextLink href="mailto:kristofer@selbekk.io">
              kristofer@selbekk.io
            </TextLink>
            , så skal vi grave det frem.
          </Text>

          <Heading fontSize="xl" mt={12}>
            Spørsmål?
          </Heading>
          <Text>
            Hvis du har noen spørsmål, så er det selvfølgelig bare å ta kontakt
            på{" "}
            <TextLink href="mailto:kristofer@selbekk.io">
              kristofer@selbekk.io
            </TextLink>
            .
          </Text>
        </Stack>
      </Container>
    </Layout>
  );
};

export default PrivacyPage;
