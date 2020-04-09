import {
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollectionData,
  useAuth
} from "reactfire";

export type UserType = {
  name: string;
  uid: string;
};

type DbUserType = UserType & {
  filledOut: boolean;
};

export const useUserRef = () => {
  const authUser = useAuth().currentUser?.uid;
  return useFirestore()
    .collection("users")
    .doc(authUser);
};

export const useUser = (): UserType | null => {
  const userRef = useUserRef();
  const { filledOut, ...dbUser } = useFirestoreDocData<DbUserType>(userRef);
  return filledOut ? dbUser : null;
};

export const useUserById = (id?: string) => {
  const user = useFirestoreDocData<DbUserType>(
    useFirestore()
      .collection("users")
      .doc(id || "totally not a valid id")
  );
  return id ? user : null;
};

export const useUsersById = (ids: string[]) => {
  return useFirestoreCollectionData<DbUserType>(
    useFirestore()
      .collection("users")
      .where("uid", "in", ids.length > 0 ? ids : ["totally not a valid id"])
  );
};
