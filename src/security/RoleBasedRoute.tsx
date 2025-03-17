import { ReactNode } from "react";
import { RouteProps } from "react-router";
import { Role } from "../models/Role.enum";

interface RoleBasedRouteType extends Omit<RouteProps, "element"> {
  isAuthenticated: boolean;
  userRole: Role | null;
  requiredRole: Role | null;
  children: ReactNode;
}

const RoleBasedRoute = ({
  isAuthenticated,
  userRole,
  requiredRole,
  children,
}: RoleBasedRouteType) => {
  if (!isAuthenticated || userRole !== requiredRole) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return <h3>401 Error!</h3>;
  }

  return <>{children}</>;
};
export default RoleBasedRoute;
