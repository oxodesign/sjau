import React from "react";
import { Text } from "@chakra-ui/core";
import { MdArrowBack } from "react-icons/md";
import { TextLink } from "./TextLink";

type BackLinkProps = {
  to: string;
  children: React.ReactNode;
};
export const BackLink: React.FC<BackLinkProps> = ({ to, children }) => (
  <Text my={6}>
    <TextLink href={to}>
      <MdArrowBack style={{ display: "inline-block" }} /> {children}
    </TextLink>
  </Text>
);
