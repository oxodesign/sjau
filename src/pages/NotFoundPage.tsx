import React from "react";
import { Layout } from "../components/Layout";
import { Container } from "../components/Container";
import { Heading, Text } from "@chakra-ui/core";

export const NotFoundPage = () => {
  return (
    <Layout title="Fant ikke den siden!">
      <Container>
        <Heading>Fant ikke den siden!</Heading>
        <Text>
          Sorry, der tror jeg du skrev inn feil adresse. Eller kanskje noen har
          endret adressen til en sjau.
        </Text>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
