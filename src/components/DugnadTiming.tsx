import React from "react";
import { Box, Stack, IconButton, Badge, Text } from "@chakra-ui/core";
import isFuture from "date-fns/isFuture";
import isPast from "date-fns/isPast";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDate from "date-fns/format";
import nbLocale from "date-fns/locale/nb";
import { MdEdit } from "react-icons/md";

type DugnadTimingProps = {
  startsAt: string;
  endsAt: string;
  onEditClick: () => void;
  ownsDugnad: boolean;
};
export const DugnadTiming: React.FC<DugnadTimingProps> = ({
  startsAt,
  endsAt,
  onEditClick,
  ownsDugnad
}) => {
  const startsAtDate = new Date(startsAt);
  const endsAtDate = new Date(endsAt);

  return (
    <>
      <Stack isInline my={3}>
        {isFuture(startsAtDate) && (
          <Text mr={3}>
            Starter{" "}
            {formatDate(startsAtDate, "EEEE d. MMMM", { locale: nbLocale })} (
            {formatDistanceToNow(startsAtDate, {
              addSuffix: true,
              locale: nbLocale
            })}
            )
          </Text>
        )}
        {isPast(endsAtDate) && (
          <Text mr={3}>
            Ble avsluttet for{" "}
            {formatDistanceToNow(endsAtDate, {
              addSuffix: true,
              locale: nbLocale
            })}{" "}
            ({formatDate(endsAtDate, "EEEE d. MMMM", { locale: nbLocale })})
          </Text>
        )}
        {isPast(startsAtDate) && isFuture(endsAtDate) && (
          <>
            <Box mr={3}>
              <Badge variantColor="green">Aktiv!</Badge>
            </Box>
            <Text mr={3}>
              Varer til{" "}
              {formatDate(endsAtDate, "EEEE d. MMMM", { locale: nbLocale })} (i{" "}
              {formatDistanceToNow(endsAtDate, { locale: nbLocale })} til)
            </Text>
          </>
        )}
        {ownsDugnad && (
          <IconButton
            size="xs"
            variant="ghost"
            icon={MdEdit}
            aria-label="Endre sjau"
            onClick={onEditClick}
          />
        )}
      </Stack>
    </>
  );
};
