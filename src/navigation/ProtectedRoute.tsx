import { Navigate } from "react-router";
import type LoggedUser from "../models/LoggedUser";

type ProtectedRouteProps = {
  loggedUser: LoggedUser | null;
  children: React.ReactNode;
};

export default function ProtectedRoute({
  loggedUser,
  children,
}: ProtectedRouteProps) {
  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
