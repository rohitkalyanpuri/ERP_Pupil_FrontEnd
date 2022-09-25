import { Redirect } from "react-router-dom";
//Sales
import Sales from "../pages/Sales";
//profile
import UserProfile from "../pages/Authentication/user-profile";

//Authentication pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
//Application
import Parents from "../pages/Parents";
interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const userRoutes: Array<RouteProps> = [
  //dashboard
  { path: "/sales", component: Sales },
  //{ path: "/dashboards-analytics", component: Analytics },
  // { path: "/calendar", component: Calendar },
  // //profile
  { path: "/profile", component: UserProfile },
  { path: "/parents", component: Parents },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/sales" /> },
];

const authRoutes: Array<RouteProps> = [
  //Authentication pages
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/register", component: Register },
  { path: "/forgot-password", component: ForgetPwd },
];

export { userRoutes, authRoutes };
