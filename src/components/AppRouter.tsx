import { Navigate, Route, Routes } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SignIn from "../pages/login/SignIn";
import Dashboard from "../pages/dashboard/Dashboard";
import BuildingsTable from "./UI/table/BuildingsTable";
import ApplicationsTable from "./UI/table/ApplicationsTable";

export default function AppRouter() {
  const auth = useContext(AuthContext);

  if (!auth) return <div style={{ color: "red" }}>Auth error!!!</div>;

  //TODO Вынести Table в один файл, изменять только TableBody
  return auth.isAuth ? (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index path="buildings" element={<BuildingsTable />} />
        <Route path="applications" element={<ApplicationsTable />} />
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
