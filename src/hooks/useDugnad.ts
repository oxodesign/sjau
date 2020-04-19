import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreCollectionData,
} from "reactfire";
import { UserType } from "./useUser";

export type DugnadType = {
  id: string;
  author: string;
  name: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  slug?: string;
  participants?: string[];
  tasks: TaskType[];
};

export type TaskStatusType = "idle" | "in progress" | "done";

export type TaskType = {
  id: string;
  author: string;
  assignedUser?: string;
  assignedUsers: string[];
  title: string;
  description: string;
  status: TaskStatusType;
};

export const useDugnadRef = (id?: string) =>
  useFirestore().collection("dugnads").doc(id);

export const useDugnad = (id?: string): DugnadType =>
  useFirestoreDocData(useDugnadRef(id), { idField: "id" });

// Handle legacy cases where we only supported a single assigned user
const mapOldTaskToNewTask = ({
  assignedUser,
  assignedUsers,
  ...task
}: TaskType) => {
  return {
    ...task,
    assignedUser: undefined,
    assignedUsers: assignedUsers ?? [assignedUser].filter(Boolean),
  };
};

export const useTasksForDugnad = (dugnadId?: string) =>
  useFirestoreCollectionData<TaskType>(
    useDugnadRef(dugnadId).collection("tasks").orderBy("status"),
    { idField: "id" }
  ).map(mapOldTaskToNewTask);

export const useTask = (dugnadId?: string, taskId?: string) =>
  mapOldTaskToNewTask(
    useFirestoreDocData<TaskType>(useTaskRef(dugnadId, taskId))
  );

export const useTaskRef = (dugnadId?: string, taskId?: string) =>
  useDugnadRef(dugnadId).collection("tasks").doc(taskId);

export const useUserDugnads = (userId: string = "") => {
  const dugnadsRef = useFirestore().collection("dugnads");
  const ownedDugnads = useFirestoreCollectionData<DugnadType>(
    dugnadsRef.where("author", "==", userId),
    { idField: "id" }
  );
  const participatedDugnads = useFirestoreCollectionData<DugnadType>(
    dugnadsRef.where("participants", "array-contains", userId),
    { idField: "id" }
  ).filter(
    (participatedDugnad) =>
      !ownedDugnads.some(
        (ownedDugnad) => ownedDugnad.id === participatedDugnad.id
      )
  );

  return {
    ownedDugnads,
    participatedDugnads,
  };
};

export type TaskComment = {
  id?: string;
  author: string;
  content: string;
  parent?: string;
  timestamp: number;
  type?: "comment" | "event";
};

export const useTaskComments = (dugnadId: string, taskId: string) => {
  const dbComments = useFirestoreCollectionData<TaskComment>(
    useFirestore().collection(`/dugnads/${dugnadId}/tasks/${taskId}/comments`),
    { idField: "id" }
  );
  // get all unique authors
  let authors = Array.from(
    new Set(dbComments.map((dbComment) => dbComment.author))
  );
  if (authors.length > 10) {
    console.warn(
      `Picking the first 10 unique authors out of ${authors.length}`
    );
    authors = authors.slice(0, 10);
  }
  // if there are no comments, provide a non-existent ID to make sure firebase doesn't crash
  if (authors.length === 0) {
    authors = ["non-existent id"];
  }
  const dbAuthors = useFirestoreCollectionData<UserType>(
    useFirestore().collection("users").where("uid", "in", authors)
  );

  return dbComments
    .map((dbComment) => {
      const author = dbAuthors.find(
        (dbAuthor) => dbAuthor.uid === dbComment.author
      );
      return {
        ...dbComment,
        author: author?.name ?? "Ukjent bruker",
        authorId: author?.uid,
      };
    })
    .sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
};
