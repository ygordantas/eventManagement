import type { PropsWithChildren } from "react";
import type LoggedUser from "../models/LoggedUser";
import { Navigate } from "react-router";

type RouteGuardProps = {
  loggedUser: LoggedUser | null;
};
export default function RouteGuard({
  loggedUser,
  children,
}: PropsWithChildren<RouteGuardProps>) {
  return loggedUser ? children : <Navigate to={"/login"} replace />;
}
