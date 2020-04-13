import { usePersistedState } from "./usePersistedState";

type Provider = "google" | "facebook" | null;
export const useLastUsedProvider = () => {
  return usePersistedState<Provider>("last-used-provider", null);
};
