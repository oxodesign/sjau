import React from "react";
import { Text, Link } from "@chakra-ui/core";
import { Link as InternalLink } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

type BackLinkProps = {
  to: string;
  children: React.ReactNode;
};
export const BackLink: React.FC<BackLinkProps> = ({ to, children }) => (
  <Text my={6}>
    {/*
      // @ts-ignore */}
    <Link as={InternalLink} to={to}>
      <MdArrowBack style={{ display: "inline-block" }} /> {children}
    </Link>
  </Text>
);
