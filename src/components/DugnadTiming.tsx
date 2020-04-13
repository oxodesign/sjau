import React from "react";
import { useDugnadRef } from "../hooks/useDugnad";
import { useFormFields } from "../hooks/useFormFields";
import {
  FormLabel,
  Box,
  FormControl,
  Stack,
  IconButton,
  Badge,
  Text
} from "@chakra-ui/core";
import isFuture from "date-fns/isFuture";
import isPast from "date-fns/isPast";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDate from "date-fns/format";
import nbLocale from "date-fns/locale/nb";
import { MdEdit, MdCheck } from "react-icons/md";

const Datepicker = React.lazy(() => import("./Datepicker"));

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
  const editButtonRef = React.useRef<HTMLButtonElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ghetto validation
    if (new Date(formState.startsAt) > new Date(formState.endsAt)) {
      alert("Sjauen må starte før den er over, da!");
      return;
    }
    setEditing(false);
    editButtonRef.current?.focus();
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
        {!isEditing && (
          <IconButton
            size="xs"
            variant="ghost"
            icon={MdEdit}
            aria-label="Endre start- og sluttetid"
            onClick={() => setEditing(true)}
            ref={editButtonRef}
          />
        )}
      </Stack>
      {isEditing && (
        <Box as="form" onSubmit={handleSubmit} my={6}>
          <Stack isInline spacing={3}>
            <FormControl>
              <FormLabel htmlFor="startsAt">Starter</FormLabel>
              <Datepicker
                size="sm"
                id="startsAt"
                selected={new Date(formState.startsAt)}
                onChange={createUpdater("startsAt")}
                autoFocus
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="endsAt">Slutter</FormLabel>
              <Datepicker
                size="sm"
                id="endsAt"
                selected={new Date(formState.endsAt)}
                onChange={createUpdater("endsAt")}
                minDate={new Date(formState.startsAt)}
              />
            </FormControl>
            <IconButton
              type="submit"
              icon={MdCheck}
              variant="solid"
              variantColor="green"
              aria-label="Lagre"
              size="sm"
              mt="28px"
            />
          </Stack>
        </Box>
      )}
    </>
  );
};
