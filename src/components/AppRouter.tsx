import { Navigate, Route, Routes } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SignIn from "../pages/login/SignIn";
import Dashboard from "../pages/dashboard/Dashboard";
import BuildingsTable from "./UI/table/buildings/BuildingsTable";
import ApplicationsTable from "./UI/table/ApplicationsTable";
import UserNoLogin from "../pages/user/UserNoLogin";
import Status from "../pages/status/Status";

export default function AppRouter() {
  const auth = useContext(AuthContext);

  if (!auth) return <div style={{ color: "red" }}>Auth error!!!</div>;

  //TODO Вынести Table в один файл, изменять только TableBody
  //TODO ДЛЯ !isAuth Вынести задний фон в шаблон остальные компоненты в children
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
      <Route path="/new" element={<UserNoLogin />}></Route>
      <Route path="/status" element={<Status />}></Route>
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}
