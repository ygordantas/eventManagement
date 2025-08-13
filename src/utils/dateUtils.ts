export const getDateOnlyString = (date?: Date): string =>
  date ? date.toISOString().split("T")[0] : "";
