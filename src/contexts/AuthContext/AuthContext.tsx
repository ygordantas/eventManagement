import { createContext } from "react";
import type User from "../../models/User";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (user: User) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
