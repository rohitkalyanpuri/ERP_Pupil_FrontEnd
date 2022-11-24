import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootReducer";

// Below code is for Persist
//import { persistor, store } from "./slices/store";
//import { PersistGate } from "redux-persist/integration/react";

const store = configureStore({ reducer: rootReducer, devTools: true });

const app = (
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);

// const app = (
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );

ReactDOM.render(app, document.getElementById("root"));
