import React from "react";
export const usePersistedState = <T = any>(
  key: string,
  defaultValue: string
) => {
  const [state, setState] = React.useState<T>(
    () => JSON.parse(localStorage.getItem(key) as string) || defaultValue
  );
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};
