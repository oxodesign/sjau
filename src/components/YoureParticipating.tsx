import React from "react";
import { useAnalytics } from "reactfire";
import { Flex, Box, Button } from "@chakra-ui/core";
import { useLocation } from "react-router-dom";
import { MdCheck, MdContentCopy } from "react-icons/md";
import useShare from "use-share";

export const YoureParticipating: React.FC = () => {
  const { pathname } = useLocation();
  const { share, hasShared } = useShare({
    title: "Bli med å sjau!",
    text: "Sjekk ut denne sjauen jeg er med på!",
    url: `https://sjau.no${pathname}`,
  });
  const { logEvent } = useAnalytics();
  return (
    <Flex
      bg="green.100"
      borderColor="green.500"
      borderWidth="1px"
      rounded="md"
      shadow="md"
      flexDirection={["column", "column", "row"]}
      alignItems="center"
      justifyContent={["center", "center", "space-between"]}
      py={3}
      px={6}
    >
      <Box>
        Du er med på denne sjauen!{" "}
        <span role="img" aria-label="Hurra for deg">
          🎉
        </span>
      </Box>
      <Button
        variant="solid"
        variantColor="green"
        size="sm"
        rightIcon={hasShared ? MdCheck : MdContentCopy}
        onClick={() => {
          share();
          logEvent("copy_url_button_click");
        }}
        m={[3, 3, 0]}
      >
        {hasShared ? "Kopiert URL!" : "Inviter flere til å delta"}
      </Button>
    </Flex>
  );
};
