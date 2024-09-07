export const truncateText = (str: string) => {
  if (str.length < 10) return str;
  return str.substring(0, 10) + "...";
};
