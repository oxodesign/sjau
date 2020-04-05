import React from "react";
import { Box, Flex, FlexProps } from "@chakra-ui/core";

export const Container: React.FC<FlexProps> = ({ children, ...props }) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="flex-end"
    minHeight="100vh"
    {...props}
  >
    <Box as="main" mx="auto" maxWidth={800} px={6}>
      {children}
    </Box>
  </Flex>
);
