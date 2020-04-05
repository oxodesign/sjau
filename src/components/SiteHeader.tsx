import React from "react";
import { Box, Heading, IconButton } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { SiteSettings } from "./SiteSettings";

export const SiteHeader: React.FC = () => {
  const [isSettingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      mb={6}
      py={3}
      textAlign="center"
      position="relative"
    >
      <Heading as="h1">
        <Link to="/">Sjau</Link>
      </Heading>
      <IconButton
        icon={MdSettings}
        aria-label="Flere valg"
        variant="ghost"
        variantColor="black"
        position="absolute"
        right={6}
        top={3}
        size="lg"
        onClick={() => setSettingsDrawerOpen(prev => !prev)}
      />
      <SiteSettings
        isOpen={isSettingsDrawerOpen}
        onClose={() => setSettingsDrawerOpen(false)}
      />
    </Box>
  );
};
