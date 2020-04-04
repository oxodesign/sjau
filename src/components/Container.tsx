import React from "react";
import { Box, Flex } from "@chakra-ui/core";

export const Container: React.FC = props => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Box as="main" mx="auto" maxWidth={600} px={6} {...props} />
  </Flex>
);
