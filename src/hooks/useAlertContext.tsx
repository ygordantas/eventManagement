import { useContext } from "react";
import AlertContext from "../contexts/AlertContext/AlertContext";

export default function useAlertContext() {
  const context = useContext(AlertContext);

  if (context === null) {
    throw new Error("AlertContext must be used within a AlertContextProvider");
  }

  return context;
}
