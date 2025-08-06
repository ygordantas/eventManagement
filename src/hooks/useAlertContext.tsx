import { useContext } from "react";
import AlertContext from "../contexts/AlertContext/AlertContext";

export default function useAlertContext() {
  const context = useContext(AlertContext);

  if (!context)
    throw new Error("AlertContext must be used within an AlertContextProvider");

  return context;
}
