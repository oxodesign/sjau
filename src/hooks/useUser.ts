import {
  useUser as useFirebaseUser,
  useFirestoreDocData,
  useFirestore
} from "reactfire";

export type UserType = {
  name: string;
  uid: string;
};

type DbUserType = UserType & {
  filledOut: boolean;
};

export const useUser = (): UserType | null => {
  const authUser = useFirebaseUser<{ uid: string }>() || {};
  const userRef = useFirestore()
    .collection("users")
    .doc(authUser.uid);
  const { filledOut, ...dbUser } = useFirestoreDocData<DbUserType>(userRef);
  if (!authUser) {
    throw Error(
      "useUser can only be used inside a context where the user is present"
    );
  }
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