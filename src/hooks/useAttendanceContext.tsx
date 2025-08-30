import { useContext } from "react";
import AttendanceContext from "../contexts/AttendanceContext/AttendanceContext";

export default function useAttendanceContext() {
  const context = useContext(AttendanceContext);

  if (!context)
    throw new Error(
      "AttendanceContext must be used within an AttendanceContextProvider"
    );

  return context;
}
