import React from "react";
import { Heading, IconButton, Flex } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { SiteSettings } from "./SiteSettings";
import { FadeIn } from "./FadeIn";
import { useAuth, useAnalytics } from "reactfire";

export const SiteHeader: React.FC = () => {
  const [isSettingsDrawerOpen, setSettingsDrawerOpen] = React.useState(false);
  const { logEvent } = useAnalytics();
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
          <>
            <IconButton
              icon={MdSettings}
              aria-label="Flere valg"
              variant="ghost"
              position="absolute"
              right={[3, 3, 6]}
              size="lg"
              onClick={() => {
                setSettingsDrawerOpen(prev => !prev);
                logEvent("toggle-settings");
              }}
            />
            <SiteSettings
              isOpen={isSettingsDrawerOpen}
              onClose={() => setSettingsDrawerOpen(false)}
            />
          </>
        )}
      </Flex>
    </FadeIn>
  );
};
