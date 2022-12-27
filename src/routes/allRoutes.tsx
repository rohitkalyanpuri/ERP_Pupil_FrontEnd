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
import ParentImport from "src/pages/Parents/parentImport";
import Students from "../pages/Students";
import StudentImport from "../pages/Students/studentImport";
import Grade from "../pages/Grades";
import Division from "../pages/Divisions";
import Academic from "src/pages/Academic";
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
  { path: "/parent-import", component: ParentImport },
  { path: "/students", component: Students },
  { path: "/student-import", component: StudentImport },
  { path: "/grades", component: Grade },
  { path: "/divisions", component: Division },
  { path: "/academics", component: Academic },
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
