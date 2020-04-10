import React from "react";
import { Spinner, Flex, Text } from "@chakra-ui/core";
import { FadeIn } from "./FadeIn";

const loadingTexts = [
  "Henter et par spader",
  "Skal bare finne en rake",
  "Hvor var det vi hadde plastposer igjen?",
  "Jeg skal bare opp og hente noe",
  "Skal bare hente litt mer jord",
  "Er det pølser snart?",
  "På tide å brette opp ermene!",
  "Gjør meg klar for å ta i et tak",
  "Kommer ut om noen minutter!",
  "Setter løker til neste vår",
  "Har du vasket henda dine i 20 sekunder nå? Hm?"
];
const getRandomLoadingText = () =>
  loadingTexts[Math.floor(Math.random() * loadingTexts.length)];

type StandaloneSpinnerProps = {
  label?: string;
};
export const StandaloneSpinner: React.FC<StandaloneSpinnerProps> = ({
  label = "Vennligst vent"
}) => (
  <Flex
    height="80vh"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <FadeIn textAlign="center" initial="hiddenFromTop" exit="hiddenFromTop">
      <Spinner
        borderColor="green.500"
        emptyColor="green.100"
        size="xl"
        thickness="4px"
        speed="0.8s"
        label={label}
      />
      <Text mt={6}>{getRandomLoadingText()}</Text>
    </FadeIn>
  </Flex>
);
