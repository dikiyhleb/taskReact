import { Navigate, Route, Routes } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SignIn from "../pages/login/SignIn";
import Dashboard from "../pages/dashboard/Dashboard";
import BuildingsTable from "./UI/table/buildings/BuildingsTable";
import ApplicationsTable from "./UI/table/applications/ApplicationsTable";
import Status from "../pages/status/Status";
import { Role } from "../models/Role.enum";
import RoleBasedRoute from "../security/RoleBasedRoute";
import NewApplication from "../pages/user/NewApplication";

export default function AppRouter() {
  const auth = useContext(AuthContext);

  if (!auth?.authUser)
    return (
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/new" element={<NewApplication />}></Route>
        <Route path="/status" element={<Status />}></Route>
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    );

  return auth.authUser.role == "MANAGER" ? (
    <Routes>
      <Route
        path="/"
        element={
          <RoleBasedRoute
            isAuthenticated={auth.isAuth}
            userRole={auth.authUser?.role ?? null}
            requiredRole={Role.MANAGER}
            children={<Dashboard />}
          />
        }
      >
        <Route index path="buildings" element={<BuildingsTable />} />
        <Route path="applications" element={<ApplicationsTable />} />
        <Route path="*" element={<Navigate to={"/buildings"} />} />
      </Route>
    </Routes>
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <RoleBasedRoute
            isAuthenticated={auth.isAuth}
            userRole={auth.authUser?.role ?? null}
            requiredRole={Role.USER}
            children={<Dashboard />}
          />
        }
      >
        <Route index path="applications" element={<ApplicationsTable />} />
        <Route path="new" element={<NewApplication />} />
        <Route path="*" element={<Navigate to={"/applications"} />} />
      </Route>
    </Routes>
  );
}
