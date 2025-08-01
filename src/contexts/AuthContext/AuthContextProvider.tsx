import { type PropsWithChildren, useCallback, useState } from "react";
import type User from "../../models/User";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, password: string) => {
    const response = localStorage.getItem(email);

    if (!response) {
      throw new Error("User not found");
    }

    const user: User = JSON.parse(response!);

    if (user.password !== password) {
      throw new Error("Incorrect password.");
    }

    setUser(user);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback((user: User) => {
    if (localStorage.getItem(user.email)) {
      throw new Error("User with provided email already exists.");
    }

    setUser(user);
    localStorage.setItem(user.email, JSON.stringify(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
