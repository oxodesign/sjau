import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  ButtonGroup,
} from "@chakra-ui/core";
import { motion } from "framer-motion";
import { MdContentCopy } from "react-icons/md";
import { useAnalytics } from "reactfire";
import useShare from "use-share";

type DugnadCreatedCalloutProps = {
  dugnadId: string;
  slug?: string;
  isFirstTime: boolean;
};

const variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring" } },
};

export const DugnadCreatedCallout: React.FC<DugnadCreatedCalloutProps> = ({
  dugnadId,
  isFirstTime,
  slug,
}) => {
  const url = `https://sjau.no/${slug ? slug : `sjau/${dugnadId}`}`;
  const { share, hasShared } = useShare({
    title: "Sjekk ut sjauen vår",
    text: "Jeg har laget en sjau for oss!",
    url,
  });
  const { logEvent } = useAnalytics();

  return (
    <motion.div variants={variants} initial="hidden" animate="visible">
      <Box
        rounded="md"
        bg="green.100"
        borderColor="green.500"
        borderWidth="1px"
        shadow="md"
        my={6}
        p={6}
      >
        <Stack spacing={6}>
          <Heading fontSize="xl">
            Gratulerer med {isFirstTime ? "din aller første" : "nok en"} sjau!{" "}
            <span role="img" aria-label="Konfetti">
              🎉
            </span>
          </Heading>
          <Text>
            Nå er det bare å dele den med de du vil skal være med å ta i et tak!
          </Text>
          <Text>
            URLen du kan dele er
            <br />
            <strong style={{ wordBreak: "break-word" }}>{url}</strong>
          </Text>
          <ButtonGroup>
            <Button
              variant="solid"
              variantColor="green"
              leftIcon={MdContentCopy}
              onClick={() => {
                share();
                logEvent("copy_url_button_click");
              }}
              isDisabled={hasShared}
            >
              {hasShared ? "Kopiert!" : "Klikk her for å kopiere"}
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </motion.div>
  );
};
