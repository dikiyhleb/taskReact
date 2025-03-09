import User from "../pages/user/User";
import Manager from "../pages/manager/Manager";
import SignIn from "../pages/login/SignIn";

export const privateRoutes = [
  { path: "/user", component: User },
  { path: "/manager", component: Manager },
];

export const publicRoutes = [{ path: "/login", component: SignIn }];
