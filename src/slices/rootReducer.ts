import { combineReducers } from "redux";
import layoutReducer from "./Layout/reducer";

//register
import registerReducer from "./Auth/Register/reducer";

//login
import loginReducer from "./Auth/Login/reducer";

//parents
import parentReducer from "./Parents/reducer";

//Alert
import alertReducer from "./Alert/reducer";

//Spinner
import spinnerReducer from "./Spinner/reducer";
// // User Profile
import profileReducer from "./Auth/Profile/reducer";

// // Forget Password
import forgetPasswordReducer from "./Auth/Forgetpwd/reducer";

//students
import studentReducer from "./Students/reducer";

//grades
import gradeReducer from "./Grades/reducer";

//divisions
import divisionReducer from "./Divisions/reducer";

//academics
import academicReducer from "./Academic/reducer";

const rootReducer = combineReducers({
  Layout: layoutReducer,
  register: registerReducer,
  login: loginReducer,
  forgetPassword: forgetPasswordReducer,
  profile: profileReducer,
  parent: parentReducer,
  alert: alertReducer,
  spinner: spinnerReducer,
  student: studentReducer,
  grade: gradeReducer,
  division: divisionReducer,
  academic: academicReducer,
});

export default rootReducer;
