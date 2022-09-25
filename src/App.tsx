import React from "react";

import { Switch, BrowserRouter as Router } from "react-router-dom";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

//redux
import { useSelector } from "react-redux";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

import fakeBackend from "./helpers/AuthType/fakeBackend";
import setAuthToken from "./utils/setAuthToken";
import {Alert} from "reactstrap"
//api config
// import config from "./config";
// Activating fake backend
fakeBackend();

setAuthToken("alpha");

const App = () => {
  const { layoutType } = useSelector((state: any) => ({
    layoutType: state.Layout.layoutType,
  }));

  function getLayout() {
    let layoutCls: Object = VerticalLayout;
    return layoutCls;
  }

  const Layout = getLayout();
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {userRoutes.map((route: any, idx: number) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
