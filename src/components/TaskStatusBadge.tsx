import React from "react";
import { Badge } from "@chakra-ui/core";
import { TaskStatusType } from "../hooks/useDugnad";
import { UserType } from "../hooks/useUser";
import { concatenate } from "../utils/concatenate";

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
          {assignedUsers && (
            <> av {concatenate(assignedUsers.map((u) => u.name))}</>
          )}
        </Badge>
      );
    case "done":
      return (
        <Badge variantColor="green" {...rest}>
          Gjort{" "}
          {assignedUsers && (
            <>av {concatenate(assignedUsers.map((u) => u.name))}</>
          )}
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
