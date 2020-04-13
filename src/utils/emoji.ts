const ranges = [
  "\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]",
  " " // Also allow spaces
].join("|");

const removeEmoji = (str: string) => str.replace(new RegExp(ranges, "g"), "");

export const isOnlyEmojis = (str: string) => {
  return !removeEmoji(str).length;
};
