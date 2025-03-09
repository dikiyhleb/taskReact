import { Navigate, Route, Routes } from "react-router";
import { privateRoutes, publicRoutes } from "../router/routes";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AppRouter() {
  const auth = useContext(AuthContext);

  if (!auth) return <div style={{ color: "red" }}>Auth error!!!</div>;

  return auth.isAuth ? (
    <Routes>
      {privateRoutes.map((r) => (
        <Route key={r.path} path={r.path} Component={r.component}></Route>
      ))}
      <Route path="*" element={<Navigate to={"/manager"} />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((r) => (
        <Route key={r.path} path={r.path} Component={r.component}></Route>
      ))}
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}
