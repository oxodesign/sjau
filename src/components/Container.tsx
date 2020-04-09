import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

export const Container: React.FC<BoxProps> = props => (
  <Box as="main" mx="auto" maxWidth={800} px={6} mb={60} {...props} />
);
