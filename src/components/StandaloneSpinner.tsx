import React from "react";
import { Spinner } from "@chakra-ui/core";
import { Container } from "./Container";

type StandaloneSpinnerProps = {
  label?: string;
};
export const StandaloneSpinner: React.FC<StandaloneSpinnerProps> = ({
  label = "Vennligst vent"
}) => (
  <Container>
    <Spinner size="xl" thickness="4px" speed="0.8s" label={label} />
  </Container>
);
