import { createContext } from "react";

type AttendanceContextType = {
  removeAttendance: (eventId: string) => Promise<void>;
  addAttendance: (eventId: string) => Promise<void>;
  isAttendingEvent: (eventId: string) => boolean;
};

const AttendanceContext = createContext<AttendanceContextType | null>(null);

export default AttendanceContext;
