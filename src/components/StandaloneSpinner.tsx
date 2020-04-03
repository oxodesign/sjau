import React from "react";
import { Spinner, Box } from "@chakra-ui/core";

type StandaloneSpinnerProps = {
  label?: string;
};
export const StandaloneSpinner: React.FC<StandaloneSpinnerProps> = ({
  label = "Vennligst vent"
}) => (
  <Box mt="100px" textAlign="center">
    <Spinner size="xl" thickness="4px" speed="0.8s" label={label} />
  </Box>
);
