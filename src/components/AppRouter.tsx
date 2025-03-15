import { Navigate, Route, Routes } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SignIn from "../pages/login/SignIn";
import Dashboard from "../pages/dashboard/Dashboard";
import ManagerTable from "./UI/table/ManagerTable";

export default function AppRouter() {
  const auth = useContext(AuthContext);

  if (!auth) return <div style={{ color: "red" }}>Auth error!!!</div>;

  return auth.isAuth ? (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route
          index
          path="buildings"
          element={<ManagerTable activePage="Объекты" />}
        />
        <Route
          path="applications"
          element={<ManagerTable activePage="Cписок заявок" />}
        />
      </Route>
      <Route path="*" element={<Navigate to={"/buildings"} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}
