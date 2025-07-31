import { useEffect, useState, type PropsWithChildren } from "react";
import Alert, { type AlertType } from "../../components/Alert/Alert";
import AlertContext from "./AlertContext";

const DEFAULT_DISMISS_TIME_IN_MS = 2000;

export type AlertData = {
  type: AlertType;
  message: string;
  autoDismiss?: boolean;
  dismissTimeInMs?: number;
};

const AlertProvider = ({ children }: PropsWithChildren) => {
  const [alert, setAlert] = useState<AlertData | null>(null);

  useEffect(() => {
    if (!alert || !alert.autoDismiss) return;

    const timer = setTimeout(() => setAlert(null), alert.dismissTimeInMs);

    return () => clearTimeout(timer);
  }, [alert]);

  const showAlert = (alertData: AlertData) => {
    setAlert(alertData);
  };

  const showSuccessAlert = (message: string, autoDismiss = true, dismissTimeInMs = DEFAULT_DISMISS_TIME_IN_MS) => {
    showAlert({ type: "success", message, autoDismiss, dismissTimeInMs });
  };

  const showErrorAlert = (
    message: string | Error,
    autoDismiss = true,
    dismissTimeInMs = DEFAULT_DISMISS_TIME_IN_MS
  ) => {
    const errorMessage = message instanceof Error ? message.message : message;
    showAlert({ type: "error", message: errorMessage, autoDismiss, dismissTimeInMs });
  };

  const showWarningAlert = (message: string, autoDismiss = true, dismissTimeInMs = DEFAULT_DISMISS_TIME_IN_MS) => {
    showAlert({ type: "warning", message, autoDismiss, dismissTimeInMs });
  };

  const showInfoAlert = (message: string, autoDismiss = true, dismissTimeInMs = DEFAULT_DISMISS_TIME_IN_MS) => {
    showAlert({ type: "info", message, autoDismiss, dismissTimeInMs });
  };

  return (
    <AlertContext.Provider
      value={{
        showSuccessAlert,
        showErrorAlert,
        showWarningAlert,
        showInfoAlert,
        showAlert,
      }}>
      {children}

      <Alert show={!!alert} type={alert?.type} message={alert?.message} onClose={() => setAlert(null)} />
    </AlertContext.Provider>
  );
};

export default AlertProvider;
