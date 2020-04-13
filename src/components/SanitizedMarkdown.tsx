import React from "react";
import marked from "marked";
import domPurify from "dompurify";
import styled from "@emotion/styled";

type SanitizedMarkdownProps = {
  children?: string;
};

const MarkdownStyler = styled.div`
  p {
    margin-bottom: 1em;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  a  {
    text-decoration: underline;
  }
`;

export const SanitizedMarkdown: React.FC<SanitizedMarkdownProps> = ({
  children
}) => {
  const purifiedMarkdown = React.useMemo(
    () => domPurify.sanitize(marked(children ?? "")),
    [children]
  );

  return (
    <MarkdownStyler dangerouslySetInnerHTML={{ __html: purifiedMarkdown }} />
  );
};

export default SanitizedMarkdown;
