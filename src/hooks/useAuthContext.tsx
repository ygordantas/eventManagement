import { useContext } from "react";
import AuthContext from "../contexts/AuthContext/AuthContext";

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("AuthContext must be used within an AuthContextProvider");

  return context;
}
