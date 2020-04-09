import React from "react";
import { Badge } from "@chakra-ui/core";
import { TaskStatusType } from "../hooks/useDugnad";
import { UserType } from "../hooks/useUser";

const getConcatenatedUsersString = (assignedUsers: UserType[]) => {
  let assignedUsersString = "";
  assignedUsers.forEach((user, index) => {
    const isNextLast = index === assignedUsers.length - 2;
    const isLast = index === assignedUsers.length - 1;
    assignedUsersString += user.name;
    if (isNextLast) {
      assignedUsersString += " og ";
    } else if (!isLast) {
      assignedUsersString += ", ";
    }
  });
  return assignedUsersString;
};

type TaskStatusBadgeType = {
  status?: TaskStatusType;
  assignedUsers?: UserType[];
  [key: string]: unknown;
};
export const TaskStatusBadge: React.FC<TaskStatusBadgeType> = ({
  status,
  assignedUsers,
  ...rest
}) => {
  switch (status) {
    case "idle":
      return (
        <Badge variantColor="gray" {...rest}>
          Klar for å plukkes
        </Badge>
      );
    case "in progress":
      return (
        <Badge
          variantColor="yellow"
          wordBreak="break-word"
          whiteSpace="normal"
          {...rest}
        >
          Jobbes med
          {assignedUsers && ` av ${getConcatenatedUsersString(assignedUsers)}`}
        </Badge>
      );
    case "done":
      return (
        <Badge variantColor="green" {...rest}>
          Ferdigstilt
        </Badge>
      );
    default:
      return (
        <Badge variantColor="gray" {...rest}>
          Klar for å plukkes
        </Badge>
      );
  }
};
