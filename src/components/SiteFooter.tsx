import React from "react";
import { Box, Text, Link } from "@chakra-ui/core";

export const SiteFooter: React.FC = () => {
  return (
    <Box as="footer" mt={6}>
      <svg viewBox="0 0 400 100">
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
            av <a href="https://selbekk.io">Kristofer Giltvedt Selbekk</a>.
          </Text>
          <Text fontSize="sm">
            Vi bruker informasjonskapsler for å skjønne hvordan du bruker
            Sjau.no. Ved å bruke tjenesten godtar du denne bruken. Les mer om
            hvordan vi bruker og lagrer dataen din{" "}
            <Link
              href="/personvern"
              textDecoration="underline"
              fontWeight="600"
            >
              her
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
