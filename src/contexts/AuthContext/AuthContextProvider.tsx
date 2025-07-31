import { useState, type PropsWithChildren } from "react";
import type User from "../../models/User";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const response = localStorage.getItem(email);

    if (!response) {
      throw new Error("User not found");
    }

    const user: User = JSON.parse(response!);

    if (user.password !== password) {
      throw new Error("Incorrect password.");
    }

    setLoggedUser(user);
  };

  const logout = () => {
    setLoggedUser(null);
  };

  const register = (user: User) => {
    localStorage.setItem(user.email, JSON.stringify(user));
    setLoggedUser(user);
  };

  return <AuthContext.Provider value={{ loggedUser, login, register, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
