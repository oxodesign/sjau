import React from "react";
import { useDugnadRef } from "../hooks/useDugnad";
import { useFormFields } from "../hooks/useFormFields";
import {
  FormLabel,
  Box,
  FormControl,
  Input,
  Stack,
  IconButton,
  Badge,
  Text
} from "@chakra-ui/core";
import isFuture from "date-fns/isFuture";
import isPast from "date-fns/isPast";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import nbLocale from "date-fns/locale/nb";
import { MdEdit } from "react-icons/md";

type DugnadTimingProps = {
  dugnadId: string;
  startsAt: string;
  endsAt: string;
};
export const DugnadTiming: React.FC<DugnadTimingProps> = ({
  dugnadId,
  startsAt,
  endsAt
}) => {
  const [isEditing, setEditing] = React.useState(false);
  const dugnadRef = useDugnadRef(dugnadId);
  const [formState, createUpdater] = useFormFields({
    startsAt,
    endsAt
  });
  const handleUpdate = () => {
    setEditing(false);
    dugnadRef.update(formState);
  };
  const startsAtDate = new Date(startsAt);
  const endsAtDate = new Date(endsAt);
  return (
    <>
      <Stack isInline my={3}>
        {isFuture(startsAtDate) && (
          <Text mr={3}>
            Starter{" "}
            {formatDistanceToNow(startsAtDate, {
              addSuffix: true,
              locale: nbLocale
            })}
          </Text>
        )}
        {isPast(endsAtDate) && (
          <Text mr={3}>
            Ble avsluttet for{" "}
            {formatDistanceToNow(endsAtDate, {
              addSuffix: true,
              locale: nbLocale
            })}
          </Text>
        )}
        {isPast(startsAtDate) && isFuture(endsAtDate) && (
          <>
            <Box mr={3}>
              <Badge variantColor="green">Aktiv!</Badge>
            </Box>
            <Text mr={3}>
              Varer i {formatDistanceToNow(endsAtDate, { locale: nbLocale })}{" "}
              til
            </Text>
          </>
        )}
        {!isEditing && (
          <IconButton
            size="xs"
            variant="ghost"
            icon={MdEdit}
            aria-label="Endre start- og sluttetid"
            onClick={() => setEditing(true)}
          />
        )}
      </Stack>
      {isEditing && (
        <Box my={6}>
          <Stack isInline spacing={3}>
            <FormControl>
              <FormLabel htmlFor="startsAt">Starter</FormLabel>
              <Input
                type="date"
                id="startsAt"
                size="sm"
                value={formState.startsAt}
                onChange={createUpdater("startsAt")}
                onBlur={handleUpdate}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="endsAt">Slutter</FormLabel>
              <Input
                type="date"
                id="endsAt"
                size="sm"
                value={formState.endsAt}
                onChange={createUpdater("endsAt")}
                onBlur={handleUpdate}
                min={formState.startsAt}
              />
            </FormControl>
          </Stack>
        </Box>
      )}
    </>
  );
};
