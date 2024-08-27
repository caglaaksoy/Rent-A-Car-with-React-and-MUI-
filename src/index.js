// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import store from "./modules/store";
// import { Provider } from "react-redux";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "../src/redux/modules/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack"; // SnackbarProvider'ı ekleyin

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
