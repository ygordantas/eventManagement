import { createContext } from "react";
import type { AlertData } from "./AlertContextProvider";

type AlertContextType = {
  showSuccessAlert: (
    message: string,
    autoDismiss?: boolean,
    dismissTimeInMs?: number
  ) => void;
  showErrorAlert: (
    message: unknown,
    autoDismiss?: boolean,
    dismissTimeInMs?: number
  ) => void;
  showWarningAlert: (
    message: string,
    autoDismiss?: boolean,
    dismissTimeInMs?: number
  ) => void;
  showInfoAlert: (
    message: string,
    autoDismiss?: boolean,
    dismissTimeInMs?: number
  ) => void;
  showAlert: (alertData: AlertData) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export default AlertContext;
