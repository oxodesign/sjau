import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreCollectionData
} from "reactfire";
import { UserType } from "./useUser";

export type DugnadType = {
  id: string;
  name: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  tasks: Array<any>; // TODO create task
};

export type TaskStatusType = "idle" | "in progress" | "done";

export type TaskType = {
  id: string;
  author: string;
  assignedUser?: string;
  title: string;
  description: string;
  status: TaskStatusType;
};

export const useDugnadRef = (id?: string) =>
  useFirestore()
    .collection("dugnads")
    .doc(id);

export const useDugnad = (id?: string): DugnadType =>
  useFirestoreDocData(useDugnadRef(id));

export const useTasksForDugnad = (dugnadId?: string) =>
  useFirestoreCollectionData<TaskType>(
    useDugnadRef(dugnadId)
      .collection("tasks")
      .orderBy("status"),
    { idField: "id" }
  );

export const useTask = (dugnadId?: string, taskId?: string) =>
  useFirestoreDocData<TaskType>(useTaskRef(dugnadId, taskId));

export const useTaskRef = (dugnadId?: string, taskId?: string) =>
  useDugnadRef(dugnadId)
    .collection("tasks")
    .doc(taskId);

export const useUserDugnads = (userId: string = "") =>
  useFirestoreCollectionData<DugnadType>(
    useFirestore()
      .collection("dugnads")
      .where("author", "==", userId),
    { idField: "id" }
  );

export type TaskComment = {
  id?: string;
  author: string;
  content: string;
  parent?: string;
  timestamp: number;
};

export const useTaskComments = (dugnadId: string, taskId: string) => {
  const dbComments = useFirestoreCollectionData<TaskComment>(
    useFirestore().collection(`/dugnads/${dugnadId}/tasks/${taskId}/comments`),
    { idField: "id" }
  );
  // get all unique authors
  let authors = Array.from(
    new Set(dbComments.map(dbComment => dbComment.author))
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
    useFirestore()
      .collection("users")
      .where("uid", "in", authors)
  );

  return dbComments.map(dbComment => ({
    ...dbComment,
    author:
      dbAuthors.find(dbAuthor => dbAuthor.uid === dbComment.author)?.name ??
      "Ukjent bruker"
  }));
};
