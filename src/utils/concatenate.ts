/** Concatenates strings together, ending with "og" */
export const concatenate = (values: string[]) =>
  values.join(", ").replace(/(.*),/, "$1 og");
