import React from "react";
import { useFirestore } from "reactfire";

/** Slugs that are used by the system, and cannot be taken */
const reservedSlugs = [
  "",
  "sjau",
  "ny",
  "oversikt",
  "personvern",
  "dugnad",
  "butikk",
];

/** Checks the availability of a slug for a sjau */
export const useSlugAvailability = (
  /** The slug you want to check availability for */
  slug: string,
  /** Slugs that you want to allow, like the current slug */
  allowedSlugs?: Array<string | undefined>
) => {
  const [isAvailable, setAvailable] = React.useState(false);
  const dugnadsRef = useFirestore().collection("dugnads");
  React.useEffect(() => {
    const checkIfSlugIsAvailable = async () => {
      if (reservedSlugs.includes(slug)) {
        setAvailable(false);
        return;
      }
      if (allowedSlugs?.includes(slug)) {
        setAvailable(true);
      }
      const slugLookup = await dugnadsRef.where("slug", "==", slug).get();
      setAvailable(slugLookup.empty);
    };

    if (reservedSlugs.includes(slug)) {
      setAvailable(false);
      return;
    }
    checkIfSlugIsAvailable();
  }, [dugnadsRef, slug, allowedSlugs]);

  return isAvailable;
};
