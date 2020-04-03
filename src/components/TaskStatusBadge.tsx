import React from "react";
import { Badge } from "@chakra-ui/core";
import { TaskStatusType } from "../hooks/useDugnad";

type TaskStatusBadgeType = {
  status?: TaskStatusType;
  [key: string]: unknown;
};
export const TaskStatusBadge: React.FC<TaskStatusBadgeType> = ({
  status,
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
        <Badge variantColor="yellow" {...rest}>
          Jobbes med
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
