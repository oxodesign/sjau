import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useClipboard,
  Stack,
  IconButton,
  ButtonGroup
} from "@chakra-ui/core";
import { motion } from "framer-motion";
import { MdContentCopy, MdClose } from "react-icons/md";

type DugnadCreatedCalloutProps = {
  dugnadId: string;
  isFirstTime: boolean;
};

const variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring" } }
};

export const DugnadCreatedCallout: React.FC<DugnadCreatedCalloutProps> = ({
  dugnadId,
  isFirstTime
}) => {
  const url = `https://sjau.no/sjau/${dugnadId}`;
  const { onCopy, hasCopied } = useClipboard(url);
  const [isClosed, setClosed] = React.useState(false);
  if (isClosed) {
    return null;
  }
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
        <IconButton
          icon={MdClose}
          position="absolute"
          variant="ghost"
          bg="transparent"
          top={4}
          right={3}
          aria-label="Lukk boksen"
          onClick={() => setClosed(true)}
        />
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
              onClick={onCopy}
              isDisabled={hasCopied}
            >
              {hasCopied ? "Kopiert!" : "Klikk her for å kopiere"}
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </motion.div>
  );
};
