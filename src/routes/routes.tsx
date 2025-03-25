import { BusinessOutlined } from "@mui/icons-material";
import { CustomRoute } from "./customRoute";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";
import BuildingsTable from "../components/UI/table/buildings/BuildingsTable";
import ApplicationsTable from "../components/UI/table/applications/ApplicationsTable";
import NewApplication from "../pages/user/NewApplication";
import { Role } from "../models/Role.enum";
import { Navigate } from "react-router";
import SignIn from "../pages/login/SignIn";
import Status from "../pages/status/Status";

export const privateRoutes: CustomRoute[] = [
  {
    path: "buildings",
    label: "Объекты",
    icon: <BusinessOutlined />,
    element: <BuildingsTable />,
    roles: [Role.MANAGER],
  },
  {
    path: "applications",
    label: "Список заявок",
    icon: <MailIcon />,
    element: <ApplicationsTable />,
    roles: [Role.MANAGER, Role.USER],
  },
  {
    path: "new",
    label: "Создать заявку",
    icon: <AddIcon />,
    element: <NewApplication />,
    roles: [Role.USER],
  },
  {
    path: "*",
    label: "",
    icon: null,
    element: <Navigate to={"/buildings"} />,
    roles: [Role.MANAGER],
  },
  {
    path: "*",
    label: "",
    icon: null,
    element: <Navigate to={"/applications"} />,
    roles: [Role.USER],
  },
];

export const publicRoutes: CustomRoute[] = [
  {
    path: "/login",
    label: "",
    icon: null,
    element: <SignIn />,
    roles: [],
  },
  {
    path: "/new",
    label: "",
    icon: null,
    element: <NewApplication />,
    roles: [],
  },
  {
    path: "/status",
    label: "",
    icon: null,
    element: <Status />,
    roles: [],
  },
  {
    path: "*",
    label: "",
    icon: null,
    element: <Navigate to={"/login"} />,
    roles: [],
  },
];
