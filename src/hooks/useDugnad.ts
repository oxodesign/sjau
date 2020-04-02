import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreCollectionData
} from "reactfire";

export type DugnadType = {
  id: string;
  name: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  tasks: Array<any>; // TODO create task
};

export type TaskType = {
  id: string;
  author: string;
  title: string;
  description: string;
  status: string;
};

export const useDugnadRef = (id?: string) =>
  useFirestore()
    .collection("dugnads")
    .doc(id);

export const useDugnad = (id?: string): DugnadType =>
  useFirestoreDocData(useDugnadRef(id));

export const useTasksForDugnad = (dugnadId?: string) =>
  useFirestoreCollectionData<TaskType>(
    useDugnadRef(dugnadId).collection("tasks"),
    { idField: "id" }
  );

export const useTask = (dugnadId?: string, taskId?: string) =>
  useFirestoreDocData<TaskType>(
    useDugnadRef(dugnadId)
      .collection("tasks")
      .doc(taskId)
  );

export const useUserDugnads = (userId: string) =>
  useFirestoreCollectionData<DugnadType>(
    useFirestore()
      .collection("dugnads")
      .where("author", "==", userId),
    { idField: "id" }
  );
