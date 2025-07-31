import { createContext, useState, type PropsWithChildren } from "react";
import type LoggedUser from "../models/LoggedUser";

type LoggedUserContextType = {
  loggedUser: LoggedUser | null;
  setLoggedUser: (user: LoggedUser) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const LoggedUserContext = createContext<LoggedUserContextType | null>(
  null
);

const LoggedUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: PropsWithChildren) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export default LoggedUserProvider;
