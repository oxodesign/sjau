import React from "react";
import { Text } from "@chakra-ui/core";
import { MdArrowBack } from "react-icons/md";
import { TextLink } from "./TextLink";

type BackLinkProps = {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
};
export const BackLink: React.FC<BackLinkProps> = ({
  to,
  children,
  onClick
}) => (
  <Text my={6}>
    <TextLink href={to} onClick={onClick}>
      <MdArrowBack style={{ display: "inline-block" }} /> {children}
    </TextLink>
  </Text>
);
