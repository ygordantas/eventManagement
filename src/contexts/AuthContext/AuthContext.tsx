import { createContext } from "react";
import type AppUser from "../../models/AppUser";

type AuthContextType = {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (user: Omit<AppUser, "id"> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  removeAttendance: (eventId: string) => void;
  addAttendance: (eventId: string) => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
