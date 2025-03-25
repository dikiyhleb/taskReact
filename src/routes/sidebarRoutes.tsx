import { BusinessOutlined } from "@mui/icons-material";
import { CustomRoute } from "./customRoute";
import MailIcon from "@mui/icons-material/Mail";
import AddIcon from "@mui/icons-material/Add";

export const managerRoutes: CustomRoute[] = [
  { path: "buildings", label: "Объекты", icon: <BusinessOutlined /> },
  { path: "applications", label: "Список заявок", icon: <MailIcon /> },
];

export const userRoutes: CustomRoute[] = [
  { path: "applications", label: "Список заявок", icon: <MailIcon /> },
  { path: "new", label: "Создать заявку", icon: <AddIcon /> },
];
