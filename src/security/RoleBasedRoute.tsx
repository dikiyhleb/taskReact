import { ReactNode } from "react";
import { Navigate, RouteProps } from "react-router";
import { Role } from "../models/Role.enum";

interface RoleBasedRouteType extends Omit<RouteProps, "element"> {
  isAuthenticated: boolean;
  userRole: Role;
  requiredRole: Role;
  children: ReactNode;
}

const RoleBasedRoute = ({
  isAuthenticated,
  userRole,
  requiredRole,
  children,
}: RoleBasedRouteType) => {
  if (!isAuthenticated || userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
export default RoleBasedRoute;
