import React from "react";
import { DugnadType } from "../hooks/useDugnad";
import { Stack, Heading, SimpleGrid, Box, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import isPast from "date-fns/isPast";
import isFuture from "date-fns/isFuture";

type DugnadListProps = {
  title: string;
  dugnads: DugnadType[];
};

const isActive = (dugnad: DugnadType) =>
  isPast(new Date(dugnad.startsAt)) && isFuture(new Date(dugnad.endsAt));

export const DugnadList: React.FC<DugnadListProps> = ({ title, dugnads }) => {
  return (
    <Stack my={6} spacing={6}>
      <Heading as="h2" fontSize="xl">
        {title}
      </Heading>
      <SimpleGrid columns={[1, 1, 2, 3]} gridGap={3}>
        {dugnads.map((dugnad) => (
          <Box
            key={dugnad.id}
            p={6}
            shadow="md"
            rounded="md"
            borderWidth="1px"
            as={(props) => <Link to={`/sjau/${dugnad.id}`} {...props} />}
            wordBreak="break-all"
            borderLeftWidth="8px"
            borderLeftColor={isActive(dugnad) ? "#76a73d" : "transparent"}
          >
            {dugnad.name}
            {isActive && (
              <Text fontSize="sm" color="gray.700">
                Foregår nå!{" "}
                <span role="img" aria-label="Muskelarm">
                  💪
                </span>
              </Text>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  );
};
