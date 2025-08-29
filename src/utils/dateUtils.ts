export const getDateOnlyString = (date?: Date): string =>
  date ? date.toISOString().split("T")[0] : "";

export const getEndOfTheDay = () => {
  const date = new Date();
  date.setHours(23, 59, 59, 99);

  return date;
};

export const getStartOfTheDay = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  return date;
};
