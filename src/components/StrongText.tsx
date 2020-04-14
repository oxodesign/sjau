import React from "react";
import { Text, BoxProps } from "@chakra-ui/core";

export const StrongText = (props: BoxProps) => (
  <Text {...props} as="strong" fontWeight={600} letterSpacing={0.1} />
);
