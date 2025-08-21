export const EVENT_STATUS = {
  PAST: "past",
  TODAY: "today",
  UPCOMING: "upcoming",
} as const;

export const EVENT_STATUS_TEXT = {
  [EVENT_STATUS.PAST]: "Past",
  [EVENT_STATUS.TODAY]: "Today",
  [EVENT_STATUS.UPCOMING]: "Upcoming",
} as const;

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];
