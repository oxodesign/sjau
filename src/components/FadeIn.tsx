import React from "react";
import { motion } from "framer-motion";
import { Box, BoxProps } from "@chakra-ui/core";

const variants = {
  hidden: {
    opacity: 0
  },
  hiddenFromTop: {
    opacity: 0,
    y: "-50px"
  },
  hiddenFromBottom: {
    opacity: 0,
    y: "50px"
  },
  hiddenFromLeft: {
    opacity: 0,
    x: "-50px"
  },
  hiddenFromRight: {
    opacity: 0,
    x: "50px"
  },
  visible: {
    opacity: 1,
    y: "0",
    x: "0"
  }
};

type FadeInProps = {
  children: React.ReactNode;
  initial: keyof typeof variants;
  exit?: keyof typeof variants;
  delay?: number;
};
export const FadeIn: React.FC<FadeInProps & BoxProps> = ({
  children,
  initial,
  exit,
  delay = 0,
  ...rest
}) => (
  <Box {...rest}>
    <motion.div
      variants={variants}
      initial={initial}
      animate="visible"
      exit={exit}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  </Box>
);
