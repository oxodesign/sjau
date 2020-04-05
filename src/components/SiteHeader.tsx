import React from "react";
import { Heading, IconButton, Flex } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { SiteSettings } from "./SiteSettings";

export const SiteHeader: React.FC = () => {
  const [isSettingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  return (
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
        <Link to="/">Sjau</Link>
      </Heading>
      <IconButton
        icon={MdSettings}
        aria-label="Flere valg"
        variant="ghost"
        position="absolute"
        right={[3, 3, 6]}
        size="lg"
        onClick={() => setSettingsDrawerOpen(prev => !prev)}
      />
      <SiteSettings
        isOpen={isSettingsDrawerOpen}
        onClose={() => setSettingsDrawerOpen(false)}
      />
    </Flex>
  );
};
