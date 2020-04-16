import { useFirestore, useFirestoreCollectionData } from "reactfire";

export const useDugnadFromSlug = (slug: string) => {
  const dugnadsRef = useFirestore().collection("dugnads");
  const matchingDugnadArray = useFirestoreCollectionData(
    dugnadsRef.where("slug", "==", slug),
    { idField: "id" }
  );

  return matchingDugnadArray[0] || null;
};
