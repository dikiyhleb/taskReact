import { Route, Routes } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../pages/dashboard/Dashboard";
import { privateRoutes, publicRoutes } from "../routes/routes";

export default function AppRouter() {
  const auth = useContext(AuthContext);

  if (!auth?.authUser)
    return (
      <Routes>
        {publicRoutes.map((r) => (
          <Route path={r.path} element={r.element} />
        ))}
      </Routes>
    );

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        {privateRoutes
          .filter(
            (r) => auth.authUser?.role && r.roles.includes(auth.authUser.role)
          )
          .map((r) => (
            <Route path={r.path} element={r.element} />
          ))}
      </Route>
    </Routes>
  );
}
