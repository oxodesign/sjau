import React from "react";
import { Box, Flex } from "@chakra-ui/core";

type SplashProps = {
  backgroundImage: string;
  children: React.ReactNode;
};

export const Splash: React.FC<SplashProps> = ({
  backgroundImage,
  children
}) => (
  <Flex
    width="100%"
    minHeight={["100vh", "75vh"]}
    bgImage={backgroundImage}
    bgPos="center center"
    bgSize="cover"
    alignItems="center"
    justifyContent="center"
  >
    <Box maxWidth={600} textAlign="center">
      {children}
    </Box>
  </Flex>
);
