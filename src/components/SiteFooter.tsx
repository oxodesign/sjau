import React from "react";
import { Box, Text } from "@chakra-ui/core";
import { TextLink } from "./TextLink";

export const SiteFooter: React.FC = () => {
  return (
    <Box as="footer" mt={6}>
      <svg viewBox="0 0 400 80">
        <circle r="650" fill="#4c6b27" cx="400" cy="685" />
        <circle r="650" fill="#76a73d" cx="100" cy="655" />
      </svg>
      <Box bg="green.500" color="black">
        <Box maxWidth={800} mx="auto" textAlign="center" px={6} pb={6}>
          <Text>
            Laget i Oslo{" "}
            <span role="img" aria-label="Norsk flagg">
              🇳🇴
            </span>{" "}
            av{" "}
            <TextLink href="https://selbekk.io">
              Kristofer Giltvedt Selbekk
            </TextLink>
            .
          </Text>
          <Text fontSize="sm">
            Vi bruker informasjonskapsler for å skjønne hvordan du bruker
            Sjau.no. Ved å bruke tjenesten godtar du denne bruken. Les mer om
            hvordan vi bruker og lagrer dataen din{" "}
            <TextLink href="/personvern" fontWeight="600">
              her
            </TextLink>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
