import React from "react";
import { Link as ChakraLink, LinkProps as ChakraProps } from "@chakra-ui/core";
import { Link as InternalLink } from "react-router-dom";

type TextLinkProps = ChakraProps & {
  href: string;
};
export const TextLink: React.FC<TextLinkProps> = ({ href, ...rest }) => {
  if (href.startsWith("https://") || href.startsWith("http://")) {
    return (
      <ChakraLink
        textDecoration="underline"
        href={href}
        rel="noopener noreferrer"
        {...rest}
      />
    );
  }
  return (
    <ChakraLink
      textDecoration="underline"
      as={((props: any) => <InternalLink to={href} {...props} />) as any}
      {...rest}
    />
  );
};
