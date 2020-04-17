import React, { useTransition } from "react";
import { useAnalytics, useAuth } from "reactfire";
import { Flex, Box, Button } from "@chakra-ui/core";
import { MdCheck, MdContentCopy } from "react-icons/md";
import useShare from "use-share";
import { useUsersById, UserType } from "../hooks/useUser";
import { GiSpade } from "react-icons/gi";
import { useParticipation } from "../hooks/useParticipation";

const concatenate = (values: string[]) =>
  values.join(", ").replace(/(.*),/, "$1 og");

const getFirstName = (participatingUser: UserType) =>
  participatingUser.name.split(" ")[0];

const getGreetingText = (
  isParticipating: boolean,
  participatingUsers: UserType[]
) => {
  let participatingUsersText;
  if (participatingUsers.length > 3) {
    const [firstName, secondName, ...remainingNames] = participatingUsers.map(
      getFirstName
    );
    participatingUsersText = `${
      isParticipating ? "Du, " : ""
    }${firstName}, ${secondName} og ${remainingNames.length} andre er med!`;
  } else if (participatingUsers.length > 0) {
    participatingUsersText = `${isParticipating ? "Du og " : ""}${concatenate(
      participatingUsers.map(getFirstName)
    )} er med!`;
  } else {
    participatingUsersText = isParticipating
      ? "Du er med!"
      : "Vær første til å bli med på denne sjauen!";
  }
  return participatingUsersText;
};

type ParticipationProps = {
  dugnadId: string;
  slug?: string;
  participants?: string[];
};

export const Participation: React.FC<ParticipationProps> = ({
  dugnadId,
  slug,
  participants,
}) => {
  const currentUser = useAuth().currentUser;
  const isParticipating = participants?.includes(currentUser!.uid);
  const uniqueUserIdsExceptYourself = Array.from(
    new Set(participants?.filter((uid) => uid !== currentUser?.uid))
  );
  const participatingUsers = useUsersById(uniqueUserIdsExceptYourself);
  const { share, hasShared } = useShare({
    title: "Bli med å sjau!",
    text: "Sjekk ut denne sjauen jeg er med på!",
    url: `https://sjau.no/${slug ?? `sjau/${dugnadId}`}`,
  });
  const { logEvent } = useAnalytics();
  const { participate } = useParticipation(dugnadId);
  const [startTransition, isLoading] = useTransition();
  return (
    <Flex
      bg="green.100"
      borderColor="green.500"
      borderWidth="1px"
      rounded="md"
      shadow="md"
      flexDirection={["column", "column", "row"]}
      alignItems="center"
      justifyContent={["center", "center", "space-between"]}
      py={3}
      px={6}
    >
      <Box>{getGreetingText(!!isParticipating, participatingUsers)}</Box>
      {isParticipating ? (
        <Button
          variant="solid"
          variantColor="green"
          size="sm"
          leftIcon={hasShared ? MdCheck : MdContentCopy}
          onClick={() => {
            share();
            logEvent("copy_url_button_click");
          }}
          m={[3, 3, 0]}
        >
          {hasShared ? "Kopiert URL!" : "Inviter flere til å delta"}
        </Button>
      ) : (
        <Button
          variant="solid"
          variantColor="green"
          size="sm"
          onClick={() => {
            startTransition(() => {
              participate();
              logEvent("join_sjau", { dugnadId, userId: currentUser?.uid });
            });
          }}
          isLoading={isLoading}
          loadingText="Blir med"
          leftIcon={GiSpade}
        >
          Bli med
        </Button>
      )}
    </Flex>
  );
};
