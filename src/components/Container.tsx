import React from "react";
import { Box } from "@chakra-ui/core";

export const Container: React.FC = props => (
  <Box mx="auto" maxWidth={600} px={6} {...props} />
);
