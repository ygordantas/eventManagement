import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

export default function RouteGuard({ children }: PropsWithChildren) {
  const { loggedUser } = useAuthContext();
  return loggedUser ? children : <Navigate to={"/login"} replace />;
}
