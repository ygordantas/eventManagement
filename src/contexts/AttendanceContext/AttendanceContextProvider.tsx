import { useCallback, useState, type PropsWithChildren } from "react";
import AttendanceContext from "./AttendanceContext";
import useAuthContext from "../../hooks/useAuthContext";
import attendanceServices from "../../services/attendanceServices";

const AttendanceContextProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthContext();
  const [attendingEvents, setAttendingEvents] = useState<string[]>(
    user?.attendingEvents ?? []
  );

  const isAttendingEvent = useCallback(
    (eventId: string) => attendingEvents.includes(eventId),
    [attendingEvents]
  );

  const addAttendance = useCallback(
    async (eventId: string) => {
      if (isAttendingEvent(eventId)) return;

      await attendanceServices.addAttendance(user!.id, eventId);
      setAttendingEvents((prev) => [...prev, eventId]);
    },

    [isAttendingEvent, user]
  );

  const removeAttendance = useCallback(
    async (eventId: string) => {
      if (!isAttendingEvent(eventId)) return;
      await attendanceServices.removeAttendance(user!.id, eventId);
      setAttendingEvents((prev) => prev.filter((id) => id != eventId));
    },
    [isAttendingEvent, user]
  );

  return (
    <AttendanceContext.Provider
      value={{
        addAttendance,
        removeAttendance,
        isAttendingEvent,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceContextProvider;
