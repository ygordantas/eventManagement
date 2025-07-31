import type { PropsWithChildren } from "react";
import type User from "../models/User";
import { Navigate } from "react-router";

type RouteGuardProps = {
  loggedUser: User | null;
};
export default function RouteGuard({
  loggedUser,
  children,
}: PropsWithChildren<RouteGuardProps>) {
  return loggedUser ? children : <Navigate to={"/login"} replace />;
}
