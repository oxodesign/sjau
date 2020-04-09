import React from "react";
import { DugnadType } from "../hooks/useDugnad";
import { Stack, Heading, SimpleGrid, Box } from "@chakra-ui/core";
import { Link } from "react-router-dom";

type DugnadListProps = {
  title: string;
  dugnads: DugnadType[];
};
export const DugnadList: React.FC<DugnadListProps> = ({ title, dugnads }) => {
  console.log(dugnads);
  return (
    <Stack my={6} spacing={6}>
      <Heading as="h2" fontSize="xl">
        {title}
      </Heading>
      <SimpleGrid columns={[1, 1, 2, 3]} gridGap={3}>
        {dugnads.map(dugnad => (
          <Box
            key={dugnad.id}
            p={6}
            shadow="md"
            rounded="md"
            borderWidth="1px"
            as={props => <Link to={`/dugnad/${dugnad.id}`} {...props} />}
            wordBreak="break-all"
          >
            {dugnad.name}
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
