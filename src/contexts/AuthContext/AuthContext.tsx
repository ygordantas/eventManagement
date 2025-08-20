import { createContext } from "react";
import type UserAuth from "../../models/UserAuth";
import type AppUser from "../../models/AppUser";

type AuthContextType = {
  user: UserAuth | null;
  login: (email: string, password: string) => Promise<void>;
  register: (user: Omit<AppUser, "id"> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
