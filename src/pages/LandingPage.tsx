import React from "react";
import { Link } from "react-router-dom";
import { Heading, Text, Button } from "@chakra-ui/core";
import { Container } from "../components/Container";

export const LandingPage = () => {
  return (
    <Container>
      <Heading as="h1">Distribuert dugnad</Heading>
      <Text>La oss ha dugnad allikevel på tross av Korona!</Text>
      <Text>
        <Button as={props => <Link to="/login" {...props} />}>
          Bli med på moroa
        </Button>
      </Text>
    </Container>
  );
};
