import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { AlertType } from "../../components/Alert/Alert";
import AlertContext from "./AlertContext";
import Alert from "../../components/Alert/Alert";

const DEFAULT_DISMISS_TIME_IN_MS = 5000;

export type AlertData = {
  type?: AlertType;
  message?: string;
  autoDismiss?: boolean;
  dismissTimeInMs?: number;
};

export default function AlertContextProvider({ children }: PropsWithChildren) {
  const [alert, setAlert] = useState<AlertData | null>(null);

  useEffect(() => {
    if (!alert || !alert.autoDismiss || !alert.dismissTimeInMs) return;

    const timer = setTimeout(() => {
      setAlert(null);
    }, alert.dismissTimeInMs);

    return () => clearTimeout(timer);
  }, [alert]);

  const showAlert = useCallback(
    (alertData: AlertData) => setAlert(alertData),
    []
  );

  const showSuccessAlert = useCallback(
    (
      message: string,
      autoDismiss: boolean = true,
      dismissTimeInMs: number = DEFAULT_DISMISS_TIME_IN_MS
    ) => {
      showAlert({ type: "success", message, autoDismiss, dismissTimeInMs });
    },
    [showAlert]
  );

  const showWarningAlert = useCallback(
    (
      message: string,
      autoDismiss: boolean = true,
      dismissTimeInMs: number = DEFAULT_DISMISS_TIME_IN_MS
    ) => {
      showAlert({ type: "warning", message, autoDismiss, dismissTimeInMs });
    },
    [showAlert]
  );

  const showInfoAlert = useCallback(
    (
      message: string,
      autoDismiss: boolean = true,
      dismissTimeInMs: number = DEFAULT_DISMISS_TIME_IN_MS
    ) => {
      showAlert({ type: "info", message, autoDismiss, dismissTimeInMs });
    },
    [showAlert]
  );

  const showErrorAlert = useCallback(
    (
      error: unknown,
      autoDismiss: boolean = true,
      dismissTimeInMs: number = DEFAULT_DISMISS_TIME_IN_MS
    ) => {
      let message = "";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else {
        JSON.stringify(error);
      }

      showAlert({
        type: "error",
        message: message,
        autoDismiss,
        dismissTimeInMs,
      });
    },
    [showAlert]
  );

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        showSuccessAlert,
        showWarningAlert,
        showInfoAlert,
        showErrorAlert,
      }}
    >
      <Alert
        show={Boolean(alert)}
        type={alert?.type}
        message={alert?.message}
        onClose={() => setAlert(null)}
      />
      {children}
    </AlertContext.Provider>
  );
}
