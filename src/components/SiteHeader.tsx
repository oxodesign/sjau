import React from "react";
import { Heading, IconButton, Flex } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import { FadeIn } from "./FadeIn";
import { useAuth } from "reactfire";

export const SiteHeader: React.FC = () => {
  const isLoggedIn = !!useAuth().currentUser;
  return (
    <FadeIn initial="hiddenFromTop" exit="hiddenFromTop">
      <Flex
        as="header"
        borderBottomWidth="1px"
        mb={6}
        py={3}
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Heading as="h1">
          <Link to={isLoggedIn ? "/oversikt" : "/"}>Sjau</Link>
        </Heading>
        {isLoggedIn && (
          <IconButton
            icon={MdPerson}
            aria-label="Brukervalg"
            variant="ghost"
            position="absolute"
            right={[3, 3, 6]}
            size="lg"
            as={(props) => <Link to="/bruker" {...props} />}
          />
        )}
      </Flex>
    </FadeIn>
  );
};
